import { FC, lazy, memo, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

// TODO theme
const IconPlaceholder: FC<{ size: number }> = ({ size }) => {
  return <div className="rounded-sm" style={{ width: size, height: size }} />;
};

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
}

// TODO theme
const Icon = memo<IconProps & { size?: number }>(function Icon({ name, size = 16, color, ...props }) {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={<IconPlaceholder size={size} />}>
      <LucideIcon {...props} color={color} size={size} />
    </Suspense>
  );
});

export default Icon;
