import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';

function ScrollToTop() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => setVisible(latest > 420));
  }, [scrollY]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          aria-label="Scroll to top"
          className="focus-ring fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full border border-white/50 bg-white/75 text-slate-950 shadow-glass backdrop-blur-xl transition hover:-translate-y-0.5 dark:border-white/10 dark:bg-slate-950/70 dark:text-white"
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span aria-hidden="true" className="block h-3 w-3 rotate-45 border-l-2 border-t-2 border-current" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}

export default ScrollToTop;
