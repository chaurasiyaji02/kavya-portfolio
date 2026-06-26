import PageTransition from '../components/PageTransition.jsx';

function ContactPage() {
  return (
    <PageTransition>
      <section className="mx-auto grid max-w-7xl gap-6 py-10 lg:grid-cols-[1fr_0.9fr] lg:py-16">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">Contact</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-5xl">
            A polished communication route is ready for the next build.
          </h1>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {['Direct email', 'Social links', 'Availability', 'Location'].map((item) => (
              <div className="rounded-2xl border border-slate-900/10 bg-white/45 p-4 dark:border-white/10 dark:bg-white/5" key={item}>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-panel min-h-80 rounded-[2rem] p-5">
          <div className="h-full rounded-[1.5rem] border border-slate-900/10 bg-gradient-to-br from-white/60 via-teal-100/50 to-indigo-100/50 dark:border-white/10 dark:from-white/10 dark:via-teal-400/10 dark:to-indigo-400/10" />
        </div>
      </section>
    </PageTransition>
  );
}

export default ContactPage;
