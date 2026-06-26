function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950" />
      <div className="absolute inset-0 bg-mesh bg-[length:180%_180%] opacity-90 animate-aurora" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(248,250,252,0.72)_70%),linear-gradient(to_bottom,transparent,rgba(248,250,252,0.88))] dark:bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(2,6,23,0.64)_70%),linear-gradient(to_bottom,transparent,rgba(2,6,23,0.9))]" />
    </div>
  );
}

export default AnimatedBackground;
