import { useMotionValue, useSpring } from 'framer-motion';

export function useSpringValue(initial = 0) {
  const value = useMotionValue(initial);

  const spring = useSpring(value, {
    stiffness: 320,
    damping: 18,
  });

  return {
    set: value.set.bind(value),
    value: spring,
  };
}
