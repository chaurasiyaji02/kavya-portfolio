import { motion } from 'framer-motion';
import CtaLink from './CtaLink.jsx';

function HeroSection({ profile }) {
  if (!profile) {
    return null;
  }

  return (
    <section className="mx-auto grid max-w-7xl items-center gap-8 py-10 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[1.04fr_0.96fr] lg:py-16">
      <div>
        {profile.availability ? (
          <motion.div
            className="glass-panel inline-flex rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {profile.availability}
          </motion.div>
        ) : null}
        <motion.p
          className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14, duration: 0.5 }}
        >
          {profile.role}
        </motion.p>
        <motion.h1
          className="mt-4 max-w-5xl text-5xl font-semibold leading-[1.02] text-gradient sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.58 }}
        >
          {profile.headline}
        </motion.h1>
        {profile.summary ? (
          <motion.p
            className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.55 }}
          >
            {profile.summary}
          </motion.p>
        ) : null}
        <motion.div
          className="mt-8 flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.55 }}
        >
          <CtaLink href={profile.resumeUrl} label="View Resume" variant="primary" />
          <CtaLink href={profile.resumeBuilderUrl} label="Build Your Resume" variant="secondary" />
          <CtaLink href={profile.contactUrl} label="Contact Me" variant="ghost" />
        </motion.div>
      </div>

      <motion.div
        className="glass-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-5"
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.22, duration: 0.6 }}
      >
        <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-900/10 bg-slate-950 p-5 text-white dark:border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-300/20 via-indigo-400/10 to-rose-300/20" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-white/55">{profile.location}</p>
                <h2 className="mt-2 text-2xl font-semibold">{profile.name}</h2>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-xl font-semibold ring-1 ring-white/10">
                KC
              </div>
            </div>
            {profile.stats?.length ? (
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {profile.stats.map((stat) => (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4" key={stat.label}>
                    <p className="text-2xl font-semibold">{stat.value}</p>
                    <p className="mt-1 text-xs leading-5 text-white/55">{stat.label}</p>
                  </div>
                ))}
              </div>
            ) : null}
            {profile.socialLinks?.length ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {profile.socialLinks.map((link) => (
                  <a className="focus-ring rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/15 hover:text-white" href={link.href} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
