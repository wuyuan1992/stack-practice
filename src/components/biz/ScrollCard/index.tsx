import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

function ScrollCard({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <motion.div
      initial={{ y: 50, scale: 0.2, opacity: 0, skewY: 30, skewX: 10 }}
      whileInView={{ y: 0, scale: 1, opacity: 1, skewY: 0, skewX: 0 }}
      viewport={{ once: true }}
      className={clsx(className)}
      whileTap={{ scale: 0.8 }}
      whileDrag={{ scale: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollCard;
