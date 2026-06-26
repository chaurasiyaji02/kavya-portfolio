import CtaLink from '../portfolio/CtaLink.jsx';

function ResumeActions() {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <button
        className="focus-ring inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        type="button"
        onClick={() => window.print()}
      >
        Download Resume
      </button>
      <CtaLink href="#builder-coming-soon" label="Build Your Resume Coming Soon" variant="secondary" />
      <CtaLink href="/contact" label="Contact Me" variant="ghost" />
    </div>
  );
}

export default ResumeActions;
