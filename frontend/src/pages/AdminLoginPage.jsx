import { motion } from 'framer-motion';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';
import { useAuth } from '../components/AuthProvider.jsx';

function AdminLoginPage() {
  const { isAuthenticated, login, sessionExpired } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate replace to="/admin" />;
  }

  const submit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      await login(form);
      navigate(location.state?.from?.pathname ?? '/admin', { replace: true });
    } catch (requestError) {
      setStatus('error');
      setError(requestError.message || 'Unable to sign in.');
    }
  };

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <PageTransition>
      <Seo
        noIndex
        description="Secure administrator access for Kavya's portfolio content dashboard."
        path="/admin/login"
        title="Admin Login | Kavya Portfolio"
      />
      <section className="mx-auto grid min-h-[68vh] max-w-7xl items-center gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">Admin access</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-5xl">
            Portfolio control room.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
            Sign in to manage portfolio content, ordering, resume details, and visitor messages.
          </p>
        </div>

        <motion.form
          className="glass-panel mx-auto w-full max-w-lg rounded-2xl p-5 sm:p-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          onSubmit={submit}
        >
          <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Administrator login</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Your session is stored only in this browser tab.
          </p>

          {sessionExpired ? (
            <p className="mt-5 rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200" role="status">
              Your admin session expired. Please sign in again.
            </p>
          ) : null}

          <label className="mt-6 grid gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
            Email
            <input
              required
              autoComplete="username"
              className="focus-ring rounded-xl border border-slate-900/10 bg-white/70 px-4 py-3 font-normal text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white"
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
            />
          </label>
          <label className="mt-5 grid gap-2 text-sm font-semibold text-slate-800 dark:text-slate-100">
            Password
            <input
              required
              autoComplete="current-password"
              className="focus-ring rounded-xl border border-slate-900/10 bg-white/70 px-4 py-3 font-normal text-slate-950 dark:border-white/10 dark:bg-white/5 dark:text-white"
              name="password"
              type="password"
              value={form.password}
              onChange={updateField}
            />
          </label>

          {error ? (
            <p className="mt-5 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200" role="alert">
              {error}
            </p>
          ) : null}

          <button
            className="focus-ring mt-6 w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-slate-950"
            disabled={status === 'submitting'}
            type="submit"
          >
            {status === 'submitting' ? 'Signing in...' : 'Sign in'}
          </button>
        </motion.form>
      </section>
    </PageTransition>
  );
}

export default AdminLoginPage;
