import {
  Award,
  BriefcaseBusiness,
  FileText,
  FolderKanban,
  GraduationCap,
  Link as LinkIcon,
  LogOut,
  Mail,
  Sparkles,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminResourcePanel from '../components/admin/AdminResourcePanel.jsx';
import { adminResources, contactResource } from '../components/admin/adminResources.js';
import AdminToast from '../components/admin/AdminToast.jsx';
import ContactMessagesPanel from '../components/admin/ContactMessagesPanel.jsx';
import { useAuth } from '../components/AuthProvider.jsx';
import PageTransition from '../components/PageTransition.jsx';
import { usePortfolioData } from '../components/PortfolioDataProvider.jsx';

const resourceIcons = {
  projects: FolderKanban,
  skills: Sparkles,
  education: GraduationCap,
  certifications: Award,
  experiences: BriefcaseBusiness,
  'social-links': LinkIcon,
  'resume-profiles': FileText,
  'contact-messages': Mail,
};

function AdminDashboardPage() {
  const { logout, session } = useAuth();
  const { retry: refreshPublic } = usePortfolioData();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(adminResources[0].key);
  const [toast, setToast] = useState(null);

  const resources = useMemo(() => [...adminResources, contactResource], []);
  const activeResource = adminResources.find((resource) => resource.key === activeKey);

  const notify = useCallback((message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const signOut = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <PageTransition>
      <AdminToast toast={toast} onClose={() => setToast(null)} />
      <section className="mx-auto max-w-7xl py-8 lg:py-12">
        <header className="flex flex-wrap items-start justify-between gap-5 border-b border-slate-900/10 pb-6 dark:border-white/10">
          <div>
            <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">Protected admin</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white sm:text-4xl">
              Content dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">{session.email}</p>
          </div>
          <button
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/60 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            type="button"
            onClick={signOut}
          >
            <LogOut aria-hidden="true" className="h-4 w-4" />
            Log out
          </button>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)]">
          <nav
            aria-label="Admin sections"
            className="flex gap-2 overflow-x-auto border-b border-slate-900/10 pb-3 dark:border-white/10 lg:sticky lg:top-28 lg:block lg:self-start lg:overflow-visible lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4"
          >
            {resources.map((resource) => {
              const Icon = resourceIcons[resource.key];
              const active = resource.key === activeKey;
              return (
                <button
                  aria-current={active ? 'page' : undefined}
                  className={`focus-ring flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition lg:mb-1 lg:w-full ${
                    active
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'text-slate-600 hover:bg-slate-950/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                  }`}
                  key={resource.key}
                  type="button"
                  onClick={() => setActiveKey(resource.key)}
                >
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                  {resource.label}
                </button>
              );
            })}
          </nav>

          <div className="min-w-0">
            {activeKey === contactResource.key ? (
              <ContactMessagesPanel notify={notify} />
            ) : (
              <AdminResourcePanel
                key={activeResource.key}
                notify={notify}
                refreshPublic={refreshPublic}
                resource={activeResource}
              />
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default AdminDashboardPage;
