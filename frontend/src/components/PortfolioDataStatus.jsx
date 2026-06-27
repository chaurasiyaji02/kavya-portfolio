function PortfolioDataStatus({ error, loading, onRetry }) {
  if (!loading && !error) {
    return null;
  }

  return (
    <div className="mx-auto mb-4 flex max-w-7xl flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-900/10 bg-white/55 px-4 py-3 text-sm shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55">
      <p className="text-slate-600 dark:text-slate-300">
        {loading ? 'Loading the latest portfolio content...' : error}
      </p>
      {!loading && error ? (
        <button
          className="focus-ring rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 dark:bg-white dark:text-slate-950"
          type="button"
          onClick={onRetry}
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}

export default PortfolioDataStatus;
