import { PropsWithChildren } from 'react';
import Button, { ButtonProps } from '../Button';

function IconButton({
  children,
  variant = 'outlined',
  shape = 'circle',
  //   type = 'text',
  type = 'primary',
  ...buttonProps
}: PropsWithChildren<ButtonProps>) {
  return (
    <Button type={type} variant={variant} shape={shape} {...buttonProps}>
      {children}
    </Button>
  );
}

export default IconButton;
