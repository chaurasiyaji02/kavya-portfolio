import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function CareerToolsSection({ tools }) {
  if (!tools?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl py-12 lg:py-16" id="resume-tools">
      <SectionHeading
        eyebrow="Free Career Tools"
        title="A few useful extras, built with privacy in mind."
        description="The portfolio comes first. These lightweight tools are here when you need help presenting your own work."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {tools.map((tool, index) => (
          <Reveal delay={index * 0.05} key={tool.title}>
            <motion.a
              className="group glass-panel block h-full rounded-2xl p-5 transition"
              href={tool.href}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-600 dark:text-teal-300">{tool.meta}</p>
              <h3 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">{tool.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{tool.description}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-slate-950 transition group-hover:text-teal-700 dark:text-white dark:group-hover:text-teal-200">
                {tool.action} <span aria-hidden="true" className="ml-2 transition group-hover:translate-x-1">-&gt;</span>
              </span>
            </motion.a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default CareerToolsSection;
