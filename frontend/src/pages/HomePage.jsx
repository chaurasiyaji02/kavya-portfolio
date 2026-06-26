import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition.jsx';

const foundationItems = ['Responsive shell', 'Theme system', 'Route motion', 'Glass surfaces'];

function HomePage() {
  return (
    <PageTransition>
      <section className="mx-auto grid max-w-7xl items-center gap-8 py-10 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <motion.div
            className="glass-panel inline-flex rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Portfolio interface foundation
          </motion.div>
          <motion.h1
            className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-gradient sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.55 }}
          >
            A premium system for a dynamic portfolio.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.55 }}
          >
            Built as a polished frontend foundation with routing, motion, responsive layout, and theme-aware interface primitives.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
          >
            <Link className="focus-ring rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950" to="/work">
              Explore structure
            </Link>
            <Link className="focus-ring rounded-full border border-slate-900/10 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-950 backdrop-blur-xl transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/10 dark:text-white" to="/about">
              View system
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="glass-panel relative overflow-hidden rounded-[2rem] p-4 sm:p-5"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.6 }}
        >
          <div className="rounded-[1.5rem] border border-slate-900/10 bg-slate-950 p-4 text-white dark:border-white/10">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-300" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-teal-300" />
              </div>
              <span className="text-xs text-white/50">UI system</span>
            </div>
            <div className="grid gap-3">
              {foundationItems.map((item, index) => (
                <motion.div
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                  key={item}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.34 + index * 0.08 }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium">{item}</span>
                    <span className="h-2 w-20 rounded-full bg-gradient-to-r from-teal-300 to-indigo-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}

export default HomePage;
