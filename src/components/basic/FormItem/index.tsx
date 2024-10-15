import React, { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

function FormItem<T extends FieldValues>({
  name,
  control,
  children,
}: PropsWithChildren<{ name: Path<T>; control: Control<T> }>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, disabled, ref }, fieldState: { error, isTouched } }) => {
        if (!React.isValidElement(children)) return children as ReactElement;
        return React.cloneElement(children as ReactElement, {
          onChange,
          onBlur,
          value,
          disabled,
          ref,
          error,
          isTouched,
        });
      }}
    />
  );
}

export default FormItem;
