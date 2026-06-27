import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navItems } from '../lib/navigation.js';
import ThemeToggle from './ThemeToggle.jsx';

function getLinkClass({ isActive }, kind) {
  return [
    'focus-ring rounded-full px-3 py-2 font-medium transition',
    kind === 'tool' ? 'text-xs' : 'text-sm',
    isActive
      ? 'bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950'
      : 'text-slate-600 hover:bg-slate-950/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white',
  ].join(' ');
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 py-3 sm:px-6 lg:px-8">
      <div className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-3 py-2">
        <Link className="focus-ring rounded-full px-3 py-2 text-sm font-semibold text-slate-950 dark:text-white" to="/" onClick={() => setOpen(false)}>
          Kavya <span className="font-normal text-slate-400">/ Portfolio</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink className={(state) => getLinkClass(state, item.kind)} key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-slate-950 text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 lg:hidden"
            type="button"
            onClick={() => setOpen((current) => !current)}
          >
            <span className="relative h-4 w-4">
              <span className={`absolute left-0 top-1 h-0.5 w-4 rounded-full bg-current transition ${open ? 'translate-y-1 rotate-45' : ''}`} />
              <span className={`absolute bottom-1 left-0 h-0.5 w-4 rounded-full bg-current transition ${open ? '-translate-y-1 -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="Mobile navigation"
            className="glass-panel mx-auto mt-3 grid max-w-7xl gap-1 rounded-3xl p-3 lg:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <NavLink className={(state) => getLinkClass(state, item.kind)} key={item.path} to={item.path} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
