import { motion } from 'framer-motion';

const statusStyles = {
  strong: 'bg-teal-500/15 text-teal-700 dark:text-teal-200',
  partial: 'bg-amber-500/15 text-amber-700 dark:text-amber-200',
  missing: 'bg-rose-500/15 text-rose-700 dark:text-rose-200',
};

const statusLabels = {
  strong: 'Strong',
  partial: 'Review',
  missing: 'Missing',
};

function InsightList({ items, emptyText, title, tone }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h2>
      {items.length ? (
        <ul className="mt-4 grid gap-3">
          {items.slice(0, 6).map((item) => (
            <li className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300" key={item}>
              <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${tone}`} />
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm leading-6 text-slate-500">{emptyText}</p>
      )}
    </section>
  );
}

function CheckerResults({ result }) {
  return (
    <div className="grid gap-6">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">Detailed review</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">13 resume checks</h2>
          </div>
          <p className="text-sm text-slate-500">Weighted total: 100 points</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {result.checks.map((check, index) => (
            <motion.article
              className="glass-panel rounded-2xl p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02 }}
              key={check.id}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-slate-950 dark:text-white">{check.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{check.detail}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[check.status]}`}>
                  {statusLabels[check.status]}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-900/10 dark:bg-white/10">
                  <div className="h-full rounded-full bg-teal-500" style={{ width: `${(check.earned / check.maximum) * 100}%` }} />
                </div>
                <span className="text-xs font-semibold text-slate-500">{check.earned}/{check.maximum}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="glass-panel grid gap-8 rounded-2xl p-6 md:grid-cols-2">
        <InsightList items={result.strengths} emptyText="Complete more sections to surface strengths." title="Strengths" tone="bg-teal-500" />
        <InsightList items={result.improvements} emptyText="No major gaps detected." title="Top improvements" tone="bg-amber-500" />
      </section>
    </div>
  );
}

export default CheckerResults;
