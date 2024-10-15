import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

const Underline: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return <p className={clsx('relative', styles.underline, className)}>{children}</p>;
};

export default Underline;
