import React, { memo, ReactElement, ReactNode } from 'react';
import { LucideProps } from 'lucide-react';

type IconType = Omit<LucideProps, 'ref'> & { icon: ReactNode };

// TODO theme
const Icon = memo<IconType>(function Icon({ icon, size = 16, color, ...props }) {
  return React.cloneElement(icon as ReactElement, {
    size,
    color,
    ...props,
  });
});

export default Icon;
