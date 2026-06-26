import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function EducationSection({ education }) {
  if (!education?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl py-12 lg:py-20" id="education">
      <SectionHeading eyebrow="Education" title="Academic foundation for software engineering." />
      <div className="mt-8 grid gap-4">
        {education.map((item) => (
          <Reveal className="glass-panel rounded-[1.75rem] p-6" key={`${item.degree}-${item.institution}`}>
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">{item.degree}</h3>
                <p className="mt-2 text-sm font-semibold text-teal-600 dark:text-teal-300">{item.institution}</p>
                {item.description ? <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p> : null}
              </div>
              <span className="w-fit rounded-full border border-slate-900/10 bg-white/60 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
                {item.period}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default EducationSection;
