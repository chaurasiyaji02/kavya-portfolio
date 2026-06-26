import PageTransition from '../components/PageTransition.jsx';

function AboutPage() {
  return (
    <PageTransition>
      <section className="mx-auto grid max-w-7xl gap-6 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:py-16">
        <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">About</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 dark:text-white sm:text-5xl">
            A calm editorial space for future story, experience, and values.
          </h1>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {['Profile narrative', 'Experience timeline', 'Skills system', 'Values'].map((item) => (
            <article className="glass-panel rounded-3xl p-6" key={item}>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{item}</h2>
              <div className="mt-6 h-2 rounded-full bg-slate-900/10 dark:bg-white/10" />
              <div className="mt-3 h-2 w-2/3 rounded-full bg-slate-900/10 dark:bg-white/10" />
            </article>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}

export default AboutPage;
