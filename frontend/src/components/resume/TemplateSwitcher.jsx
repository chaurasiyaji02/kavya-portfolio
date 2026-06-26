import { motion } from 'framer-motion';

function TemplateSwitcher({ activeTemplateId, onChange, templates }) {
  if (!templates?.length) {
    return null;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 print:hidden">
      {templates.map((template) => {
        const active = activeTemplateId === template.id;

        return (
          <button
            className={`focus-ring relative overflow-hidden rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 ${
              active
                ? 'border-slate-950 bg-slate-950 text-white shadow-glow dark:border-white dark:bg-white dark:text-slate-950'
                : 'border-slate-900/10 bg-white/60 text-slate-800 backdrop-blur-xl hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/15'
            }`}
            key={template.id}
            type="button"
            onClick={() => onChange(template.id)}
          >
            {active ? <motion.span className="absolute inset-x-4 top-0 h-1 rounded-full bg-gradient-to-r from-teal-300 to-indigo-300" layoutId="active-resume-template" /> : null}
            <span className="block text-sm font-semibold">{template.name}</span>
            <span className={`mt-2 block text-xs leading-5 ${active ? 'text-white/70 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'}`}>
              {template.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default TemplateSwitcher;
