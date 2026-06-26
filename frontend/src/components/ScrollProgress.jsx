import { motion, useScroll, useSpring } from 'framer-motion';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-teal-300 via-indigo-400 to-rose-300"
      style={{ scaleX }}
    />
  );
}

export default ScrollProgress;
