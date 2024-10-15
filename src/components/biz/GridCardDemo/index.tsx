import clsx from 'clsx';
import styles from './index.module.css';
import Icon from '@/components/ui/Icon';
import { LucideArrowRightFromLine } from 'lucide-react';
import IconButton from '@/components/ui/IconButton';
import img from '@/assets/img.jpg';
import { motion } from 'framer-motion';
import { useSpringValue } from '@/lib/framer-motion';
import Underline from '../Underline';

function GridCardDemo() {
  const springValue = useSpringValue(0);

  return (
    <div
      className={clsx('w-full h-full bg-white rounded-md inline-flex relative p-1', styles.container)}
      onMouseEnter={() => springValue.set(32)}
      onMouseLeave={() => springValue.set(0)}
    >
      <div
        className={clsx(
          'z-50 absolute top-1 left-1 p-2 bg-white rounded-tl-sm rounded-br-lg  max-w-fit flex items-center justify-start gap-2',
          styles.corner,
          styles.cornerTl,
        )}
      >
        <Underline className="text-black">This is title This is titleThis is</Underline>

        <motion.div className="overflow-hidden" style={{ width: springValue.value }}>
          <IconButton size="small">
            <Icon icon={<LucideArrowRightFromLine />} />
          </IconButton>
        </motion.div>
      </div>

      <div
        className={clsx(
          'z-50 absolute bottom-1 right-1 p-2 bg-white rounded-tl-lg rounded-br-sm text-black max-w-fit',
          styles.corner,
          styles.cornerBr,
        )}
      >
        This is title This is titleThis is
      </div>

      <div className={clsx('bg-slate-900 rounded-md p-2 w-full h-full flex items-center justify-center')}>
        <div className={clsx('w-full h-full flex items-center justify-center', styles.content)}>
          <img className="object-contain max-h-full" alt="content" src={img} />
        </div>
      </div>
    </div>
  );
}

export default GridCardDemo;
