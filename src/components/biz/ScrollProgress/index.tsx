import { motion, useScroll, useSpring } from 'framer-motion';
import { RefObject } from 'react';

function ScrollProgress({ container }: { container?: RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({ container });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="sticky top-0 left-0 z-50 h-1 bg-orange-500"
      style={{ scaleX, transformOrigin: 'top left' }}
    />
  );
}

export default ScrollProgress;
