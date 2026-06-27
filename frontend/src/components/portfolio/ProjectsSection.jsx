import { motion } from 'framer-motion';
import Reveal from './Reveal.jsx';
import SectionHeading from './SectionHeading.jsx';

function ProjectsSection({ projects }) {
  if (!projects?.length) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl py-12 lg:py-20" id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Selected builds shaped by curiosity and practical learning."
        description="A mix of polished frontend work, Java exploration, and useful tools built to solve real problems."
      />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal delay={index * 0.06} key={project.title}>
            <motion.article
              className="group glass-panel relative h-full overflow-hidden rounded-[1.75rem] p-5 [transform-style:preserve-3d]"
              whileHover={{ rotateX: 4, rotateY: -5, y: -8 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              {project.imageUrl ? (
                <img
                  alt=""
                  className="absolute inset-x-0 top-0 h-36 w-full object-cover opacity-20 transition duration-500 group-hover:scale-105 group-hover:opacity-30"
                  src={project.imageUrl}
                />
              ) : (
                <div className={`absolute inset-x-0 top-0 h-36 bg-gradient-to-br ${project.accent}`} />
              )}
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">{project.status}</p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight text-slate-950 dark:text-white">{project.title}</h3>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-slate-950 text-sm font-semibold text-white transition group-hover:scale-105 dark:bg-white dark:text-slate-950">
                    Go
                  </span>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
                {project.techStack?.length ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span className="rounded-full bg-slate-950/[0.06] px-3 py-1.5 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-slate-200" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="mt-7 flex flex-wrap gap-3">
                  {project.githubUrl ? (
                    <a className="focus-ring rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950" href={project.githubUrl}>
                      GitHub
                    </a>
                  ) : null}
                  {project.liveUrl ? (
                    <a className="focus-ring rounded-full border border-slate-900/10 bg-white/60 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white" href={project.liveUrl}>
                      Live Demo
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;
