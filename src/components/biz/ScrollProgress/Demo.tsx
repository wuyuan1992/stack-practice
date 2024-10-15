import { useMemo, useRef } from 'react';
import ScrollProgress from '.';
import clsx from 'clsx';
import ScrollCard from '../ScrollCard';
import DotBgContainer from '../DotBgContainer';
import styles from './demo.module.css';

function ScrollDemo() {
  const ref = useRef<HTMLDivElement>(null);

  const list = useMemo(() => {
    return Array.from(new Array(11)).map(() => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.');
  }, []);

  return (
    <div className="w-screen h-screen overflow-scroll relative" ref={ref}>
      <ScrollProgress container={ref} />
      <div className={clsx('flex flex-col gap-2 p-2', styles.aside)}>
        {list.map((item, index) => (
          <ScrollCard key={index}>
            <div className={clsx('p-4 rounded flex items-center justify-center', styles.asideItem)}>{item}</div>
          </ScrollCard>
        ))}
      </div>
      <DotBgContainer className="fixed left-0 bottom-0 w-full h-24 z-50" />
    </div>
  );
}

export default ScrollDemo;
