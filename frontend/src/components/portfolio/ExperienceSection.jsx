import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function ExperienceSection({ experience }) {
  if (!experience?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl py-12 lg:py-20" id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Internship and project experience with real implementation habits."
        description="Internship and project work where responsive interfaces, collaboration, and steady delivery came together."
      />
      <div className="mt-8 grid gap-4">
        {experience.map((item, index) => (
          <Reveal className="glass-panel rounded-[1.75rem] p-6" delay={index * 0.06} key={`${item.role}-${item.company}`}>
            <div className="grid gap-5 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">{item.period}</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">{item.role}</h3>
                <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">{item.company}</p>
              </div>
              <div>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                {item.achievements?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.achievements.map((achievement) => (
                      <span className="rounded-full bg-slate-950/[0.06] px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200" key={achievement}>
                        {achievement}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
