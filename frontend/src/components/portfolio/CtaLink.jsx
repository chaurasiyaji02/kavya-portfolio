const variantClasses = {
  primary: 'bg-slate-950 text-white shadow-glow hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200',
  secondary:
    'border border-slate-900/10 bg-white/70 text-slate-950 shadow-sm backdrop-blur-xl hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/15',
  ghost: 'text-slate-700 hover:bg-slate-950/5 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white',
};

function CtaLink({ href, label, variant = 'secondary' }) {
  return (
    <a className={`focus-ring inline-flex rounded-full px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${variantClasses[variant]}`} href={href}>
      {label}
    </a>
  );
}

export default CtaLink;
