import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';
import Seo from '../components/Seo.jsx';

function NotFoundPage() {
  return (
    <PageTransition>
      <Seo
        noIndex
        description="The requested portfolio page could not be found."
        path="/404"
        title="Page Not Found | Kavya Portfolio"
      />
      <section className="mx-auto grid min-h-[60vh] max-w-4xl place-items-center py-16 text-center">
        <div className="glass-panel rounded-[2rem] p-8 sm:p-12">
          <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">404</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white sm:text-6xl">Page not found</h1>
          <p className="mx-auto mt-5 max-w-xl text-slate-600 dark:text-slate-300">
            This route is not part of the portfolio foundation.
          </p>
          <Link className="focus-ring mt-8 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950" to="/">
            Return home
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

export default NotFoundPage;
