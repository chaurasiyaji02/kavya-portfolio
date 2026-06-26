function BuilderTextarea({ label, onChange, placeholder = '', rows = 4, value }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
      {label}
      <textarea
        className="focus-ring min-h-28 resize-y rounded-2xl border border-slate-900/10 bg-white/70 px-4 py-3 text-sm font-medium leading-6 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 dark:border-white/10 dark:bg-white/10 dark:text-white"
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export default BuilderTextarea;
