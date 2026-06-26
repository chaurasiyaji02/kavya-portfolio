import PageTransition from '../components/PageTransition.jsx';

const lanes = ['Featured', 'Case studies', 'Experiments'];

function WorkPage() {
  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl py-10 lg:py-16">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">Work</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-5xl">
            A flexible canvas for future projects and case studies.
          </h1>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {lanes.map((lane) => (
            <article className="glass-panel min-h-72 rounded-[1.75rem] p-5" key={lane}>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{lane}</h2>
              <div className="mt-8 space-y-3">
                <div className="h-3 rounded-full bg-slate-900/10 dark:bg-white/10" />
                <div className="h-3 w-3/4 rounded-full bg-slate-900/10 dark:bg-white/10" />
                <div className="h-28 rounded-3xl bg-gradient-to-br from-slate-900/10 to-teal-400/20 dark:from-white/10 dark:to-teal-300/15" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

export default WorkPage;
