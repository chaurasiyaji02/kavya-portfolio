import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function SkillsSection({ skills }) {
  if (!skills?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl py-12 lg:py-20" id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="A practical stack for full-stack product development."
        description="Organized by category so future backend content can power the same interface without redesigning the UI."
        align="center"
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {skills.map((group, index) => {
          if (!group.items?.length) {
            return null;
          }

          return (
            <Reveal className="glass-panel rounded-[1.75rem] p-5" delay={index * 0.05} key={group.category}>
              <h3 className="text-lg font-semibold text-slate-950 dark:text-white">{group.category}</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span className="rounded-full border border-slate-900/10 bg-white/55 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default SkillsSection;
