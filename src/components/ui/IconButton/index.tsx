import { ReactNode } from 'react';
import Button, { ButtonProps } from '../Button';

function IconButton({
  icon,
  variant = 'outlined',
  shape = 'circle',
  //   type = 'text',
  type = 'primary',
  ...buttonProps
}: ButtonProps & { icon: ReactNode }) {
  return (
    <Button type={type} variant={variant} shape={shape} {...buttonProps}>
      {icon}
    </Button>
  );
}

export default IconButton;
