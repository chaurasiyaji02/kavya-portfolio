import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pressed, setPressed] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 420, damping: 34 });
  const smoothY = useSpring(cursorY, { stiffness: 420, damping: 34 });

  useEffect(() => {
    const query = matchMedia('(hover: hover) and (pointer: fine)');
    const updateEnabled = () => setEnabled(query.matches);

    updateEnabled();
    query.addEventListener('change', updateEnabled);

    const moveCursor = (event) => {
      cursorX.set(event.clientX - 12);
      cursorY.set(event.clientY - 12);
    };
    const onPointerDown = () => setPressed(true);
    const onPointerUp = () => setPressed(false);

    window.addEventListener('pointermove', moveCursor);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      query.removeEventListener('change', updateEnabled);
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [cursorX, cursorY]);

  if (!enabled) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] h-6 w-6 rounded-full border border-teal-300/80 bg-white/20 mix-blend-difference backdrop-blur-sm"
      style={{ x: smoothX, y: smoothY }}
      animate={{ scale: pressed ? 0.72 : 1 }}
      transition={{ duration: 0.18 }}
    />
  );
}

export default CustomCursor;
