import React, { useState, useRef, useCallback, useMemo } from 'react';
import styles from './index.module.css';
import useThrottle from '@/hooks/useThrottle';
import clsx from 'clsx';

type ResizableGridProps = {
  minFirstSize?: number; // 第一部分最小宽度
  maxFirstSize?: number; // 第一部分最大宽度
  initialFirstSize?: number; // 初始宽度
  resizerSize?: number; // 初始宽度
  children: [React.ReactNode, React.ReactNode]; // 左右面板内容
  className?: string;
  resizerClassName?: string;
  vertical?: boolean;
};

const ResizableGrid: React.FC<ResizableGridProps> = ({
  minFirstSize = 64,
  maxFirstSize = 200,
  initialFirstSize = 64,
  resizerSize = 4,
  vertical = false,
  className,
  resizerClassName,
  children,
}) => {
  const [firstSize, setFirstSize] = useState(initialFirstSize);
  const containerRef = useRef<HTMLDivElement>(null);

  const resizerRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);

  const onMouseMove = useThrottle((e: MouseEvent) => {
    if (!containerRef.current || !resizerRef.current) return;

    const { left, width, top, height } = containerRef.current.getBoundingClientRect();

    const size = vertical
      ? Math.min(maxFirstSize, height - resizerSize, Math.max(minFirstSize, e.clientY - top))
      : Math.min(maxFirstSize, width - resizerSize, Math.max(minFirstSize, e.clientX - left));

    setFirstSize(size);
  });

  const onMouseUp = useCallback(() => {
    isResizingRef.current = false;
    containerRef.current?.classList.remove(styles.active);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }, [onMouseMove]);

  const onMouseDown = useCallback(() => {
    isResizingRef.current = true;
    containerRef.current?.classList.add(styles.active);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [onMouseMove, onMouseUp]);

  const firstStyle = useMemo(() => {
    return vertical ? { height: firstSize } : { width: firstSize };
  }, [vertical, firstSize]);

  const resizerStyle = useMemo(() => {
    return vertical ? { height: resizerSize } : { width: resizerSize };
  }, [vertical, resizerSize]);

  const containerStyle = useMemo(() => {
    return vertical
      ? {
          gridTemplateRows: `auto ${resizerSize}px minmax(auto, 1fr)`,
        }
      : {
          gridTemplateColumns: `auto ${resizerSize}px minmax(auto, 1fr)`,
        };
  }, [vertical, resizerSize]);

  return (
    <div
      ref={containerRef}
      className={clsx(styles.container, className, { [styles.vertical]: vertical })}
      style={containerStyle}
    >
      <div className="overflow-hidden" style={firstStyle}>
        {children[0]}
      </div>
      <div
        ref={resizerRef}
        className={clsx(styles.resizer, resizerClassName)}
        style={resizerStyle}
        onMouseDown={onMouseDown}
      />
      <div className="overflow-hidden">{children[1]}</div>
    </div>
  );
};

export default ResizableGrid;
