import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function AboutSection({ about }) {
  if (!about?.title && !about?.body && !about?.highlights?.length) {
    return null;
  }

  return (
    <section className="mx-auto grid max-w-7xl gap-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-20" id="about">
      <SectionHeading eyebrow={about.eyebrow} title={about.title} description={about.body} />
      {about.highlights?.length ? (
        <Reveal className="grid gap-3">
          {about.highlights.map((highlight, index) => (
            <div className="glass-panel rounded-3xl p-5" key={highlight}>
              <div className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-slate-950 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">{highlight}</p>
              </div>
            </div>
          ))}
        </Reveal>
      ) : null}
    </section>
  );
}

export default AboutSection;
