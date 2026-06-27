import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';
import { useAuth } from '../components/AuthProvider.jsx';
import { getAdminContactMessages } from '../lib/api.js';

function AdminDashboardPage() {
  const { logout, session } = useAuth();
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState({ state: 'loading', messages: 0 });

  useEffect(() => {
    let active = true;
    getAdminContactMessages()
      .then((messages) => {
        if (active) {
          setApiStatus({ state: 'ready', messages: messages.length });
        }
      })
      .catch((error) => {
        if (active) {
          setApiStatus({ state: 'error', message: error.message });
        }
      });
    return () => {
      active = false;
    };
  }, []);

  const signOut = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl py-10 lg:py-16">
        <div className="flex flex-wrap items-start justify-between gap-5 border-b border-slate-900/10 pb-8 dark:border-white/10">
          <div>
            <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">Protected admin</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
              Dashboard foundation
            </h1>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{session.email}</p>
          </div>
          <button
            className="focus-ring rounded-full border border-slate-900/10 bg-white/60 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            type="button"
            onClick={signOut}
          >
            Log out
          </button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="glass-panel rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Session</p>
            <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">Authenticated</p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Role: {session.role}</p>
          </div>
          <div className="glass-panel rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Secure API</p>
            <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">
              {apiStatus.state === 'loading' ? 'Connecting...' : apiStatus.state === 'ready' ? 'Connected' : 'Unavailable'}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {apiStatus.state === 'ready'
                ? `${apiStatus.messages} contact message${apiStatus.messages === 1 ? '' : 's'}`
                : apiStatus.message ?? 'Checking authorization'}
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Content tools</p>
            <p className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">Coming next</p>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              CRUD interfaces are intentionally outside this authentication milestone.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default AdminDashboardPage;
