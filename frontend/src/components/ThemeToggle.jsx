import { useTheme } from './ThemeProvider.jsx';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-slate-900/10 bg-white/70 text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15"
      type="button"
      onClick={toggleTheme}
    >
      <span aria-hidden="true" className="relative h-4 w-4 rounded-full border border-current">
        <span className={`absolute inset-y-0 right-0 w-2 rounded-r-full bg-current transition ${isDark ? 'opacity-100' : 'opacity-0'}`} />
      </span>
    </button>
  );
}

export default ThemeToggle;
