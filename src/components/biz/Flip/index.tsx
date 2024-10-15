import clsx from 'clsx';
import styles from './index.module.css';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

function Flip({
  start = 0,
  end = 10,
  step = 1,
  backwards = false,
  interval = 1,
}: {
  start?: number;
  end?: number;
  step?: number;
  backwards?: boolean;
  interval?: number; // seconds
}) {
  const ref = useRef<HTMLDivElement>(null);
  const valueRef = useRef<number | null>(null);
  const timerRef = useRef<number>();

  const getNextValue = useNextValue({ start, end, step, backwards: backwards });

  const onStart = useCallback(() => {
    const animateCls = styles.animate;
    timerRef.current = setInterval(() => {
      valueRef.current = valueRef.current === null ? (backwards ? end : start) : getNextValue(valueRef.current);
      ref.current?.setAttribute('data-prev-value', String(valueRef.current));
      ref.current?.classList.remove(animateCls);

      setTimeout(() => {
        ref.current?.setAttribute('data-next-value', String(getNextValue(valueRef.current as number)));
        ref.current?.classList.add(animateCls);
      }, 10);
    }, 1000 * interval) as unknown as number;
  }, []);

  useLayoutEffect(() => {
    ref.current?.setAttribute('data-prev-value', '');
    ref.current?.setAttribute('data-next-value', String(backwards ? end : start));
    onStart();
  }, []);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="w-8 h-8 overflow-y-hidden border">
      <div
        ref={ref}
        className={clsx(
          'w-8 h-8 relative',
          styles.flip,
          styles.animate,
          backwards ? styles.backwards : styles.forwards,
        )}
      />
    </div>
  );
}

export default Flip;

function useNextValue({
  start,
  end,
  step,
  backwards,
}: {
  start: number;
  end: number;
  step: number;
  backwards: boolean;
}) {
  return useCallback(
    (currentValue: number) => {
      let nextValue = currentValue;

      if (backwards) {
        nextValue -= step;
        if (nextValue < start) nextValue = end - ((start - nextValue) % (end - start));
      } else {
        nextValue += step;
        if (nextValue > end) nextValue = start + ((nextValue - end) % (end - start));
      }

      return nextValue;
    },
    [start, end, step, backwards],
  );
}
