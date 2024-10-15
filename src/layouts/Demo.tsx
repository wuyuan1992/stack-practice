import { motion, useScroll, useSpring } from 'framer-motion';
import { RefObject, useMemo, useRef, useState } from 'react';

function LayoutDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useProgress(ref);

  const h = useMemo(() => {
    if (progress < 0.95) return 1 - progress;
    return 0;
  }, [progress]);

  const list = useMemo(() => {
    return Array.from(new Array(10)).map(
      () =>
        'https://media.istockphoto.com/id/1958314714/photo/muschampia-protoides-619.webp?a=1&b=1&s=612x612&w=0&k=20&c=OIlYAU7SFDXJ46oBZgJJhQ5R9IlZW3wVYCbVnraesgs=',
    );
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div
        className="flex-shrink-0 border overflow-hidden"
        style={{ height: `${50 * h}vw`, visibility: h > 0 ? 'visible' : 'hidden' }}
      >
        <img
          className="block aspect-[4/3] object-cover"
          alt="img"
          src="https://images.unsplash.com/file-1707885205802-88dd96a21c72image?w=416&dpr=2&auto=format&fit=crop&q=60"
        />
      </div>

      <motion.div className="flex-grow-1 flex-shrink-1 overflow-scroll" ref={ref}>
        <div className="w-full flex flex-col gap-4 p-4">
          {list.map((img, index) => (
            <img key={index} className="block aspect-[4/3] object-cover" alt="img" src={img} />
          ))}
        </div>
      </motion.div>

      <div className="flex-shrink-0 h-16"></div>
    </div>
  );
}

function useProgress(container: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll({ container });

  const transform = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  transform.on('change', setProgress);

  return progress;
}

export default LayoutDemo;
