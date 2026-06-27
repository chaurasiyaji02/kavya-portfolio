import { motion } from 'framer-motion';

function getScoreLabel(score) {
  if (score >= 85) return 'Strong foundation';
  if (score >= 70) return 'Good progress';
  if (score >= 50) return 'Needs refinement';
  return 'Early draft';
}

function CheckerScore({ result }) {
  return (
    <motion.section
      className="glass-panel grid gap-6 rounded-2xl p-6 sm:grid-cols-[auto_1fr] sm:items-center"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        aria-label={`Resume score ${result.score} out of 100`}
        className="grid h-36 w-36 place-items-center rounded-full p-3"
        style={{ background: `conic-gradient(#14b8a6 ${result.score * 3.6}deg, rgba(148, 163, 184, 0.2) 0deg)` }}
      >
        <div className="grid h-full w-full place-items-center rounded-full bg-white text-center dark:bg-slate-950">
          <div>
            <p className="text-4xl font-semibold text-slate-950 dark:text-white">{result.score}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">out of 100</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">{getScoreLabel(result.score)}</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Your resume review</h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
          This score is a practical completeness and ATS-readiness guide, not a hiring guarantee. Use the individual checks to decide what to improve next.
        </p>
      </div>
    </motion.section>
  );
}

export default CheckerScore;
