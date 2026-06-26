import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function CertificationsSection({ certifications }) {
  if (!certifications?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl py-12 lg:py-20" id="certifications">
      <SectionHeading eyebrow="Certifications" title="Continuous learning, organized for growth." align="center" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {certifications.map((certification, index) => (
          <Reveal className="glass-panel rounded-[1.75rem] p-6" delay={index * 0.06} key={`${certification.title}-${certification.issuer}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{certification.title}</h3>
                <p className="mt-2 text-sm font-semibold text-teal-600 dark:text-teal-300">{certification.issuer}</p>
              </div>
              <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs font-semibold text-white dark:bg-white dark:text-slate-950">
                {certification.year}
              </span>
            </div>
            {certification.description ? <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{certification.description}</p> : null}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default CertificationsSection;
