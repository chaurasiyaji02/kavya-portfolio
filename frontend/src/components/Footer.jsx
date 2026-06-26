import { Link } from 'react-router-dom';
import { navItems } from '../lib/navigation.js';

function Footer() {
  return (
    <footer className="border-t border-slate-900/10 px-4 py-8 dark:border-white/10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <Link className="focus-ring w-fit rounded-full text-sm font-semibold" to="/">
          Kavya Portfolio
        </Link>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600 dark:text-slate-300">
          {navItems.map((item) => (
            <Link className="focus-ring rounded-full transition hover:text-slate-950 dark:hover:text-white" key={item.path} to={item.path}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
