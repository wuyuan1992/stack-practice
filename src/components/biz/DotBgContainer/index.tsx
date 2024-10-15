import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from './index.module.css';

function DotBgContainer({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={clsx(styles.container, className)}>{children}</div>;
}

export default DotBgContainer;
