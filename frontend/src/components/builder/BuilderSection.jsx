function BuilderSection({ children, description, title }) {
  return (
    <section className="glass-panel min-w-0 max-w-full overflow-hidden rounded-[1.75rem] p-4 sm:p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h2>
        {description ? <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{description}</p> : null}
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

export default BuilderSection;
