import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 850);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <div className="min-w-52 text-center">
            <div className="mx-auto mb-5 h-12 w-12 rounded-full border border-slate-900/10 bg-white/70 p-1 shadow-glow dark:border-white/10 dark:bg-white/10">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-teal-300 via-indigo-400 to-rose-300" />
            </div>
            <div className="relative h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div className="absolute inset-y-0 w-1/2 rounded-full bg-slate-950 animate-shimmer dark:bg-white" />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default LoadingScreen;
