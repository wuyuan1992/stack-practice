/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useCallback } from 'react';

function useThrottle<T extends (...args: any[]) => void>(func: T, delay = 10) {
  const lastExecuted = useRef<number>(0);

  const throttledFunction = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastExecuted.current >= delay) {
        func(...args);
        lastExecuted.current = now;
      }
    },
    [func, delay],
  );

  return throttledFunction;
}

export default useThrottle;
