import { ChangeEventHandler, useCallback } from 'react';
import { FieldError, RefCallBack, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import FormItem from '.';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface DemoFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const DemoSchema = z
  .object({
    email: z.string({ message: 'email required' }).min(1, { message: 'email required' }).email(),
    password: z
      .string({ message: 'password required' })
      .min(1, { message: 'password required' })
      .min(8, { message: 'Password is too short' })
      .max(20, { message: 'Password is too long' }),
    confirmPassword: z.string({ message: 'confirmPassword required' }),
  })
  .required({
    email: true,
    password: true,
  })
  .refine((data) => !data.password || !data.confirmPassword || data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // path of error
  });

function FormDemo() {
  const { control, handleSubmit } = useForm<DemoFormData>({
    mode: 'onChange',
    resolver: zodResolver(DemoSchema),
  });

  const onSubmit = useCallback((data: DemoFormData) => {
    console.log(data);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* email */}
        <div>
          <label>email</label>
          <FormItem name="email" control={control}>
            <EmailInput />
          </FormItem>
        </div>

        {/* password */}
        <div>
          <label>password</label>
          <FormItem name="password" control={control}>
            <PasswordInput />
          </FormItem>
        </div>

        {/* confirmPassword */}
        <div>
          <label>confirmPassword</label>
          <FormItem name="confirmPassword" control={control}>
            <PasswordInput />
          </FormItem>
        </div>

        {/* submit */}
        <div className="mt-4">
          <Button htmlType="submit">submit</Button>
        </div>
      </form>
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  error,
  ref,
}: {
  value?: string;
  onChange?: ChangeEventHandler;
  error?: FieldError;
  ref?: RefCallBack;
}) {
  return (
    <>
      <Input ref={ref} type="password" value={value} onChange={onChange} />
      {error && <span className="error-message">{error.message}</span>}
    </>
  );
}

function EmailInput({
  value,
  onChange,
  error,
  ref,
}: {
  value?: string;
  onChange?: ChangeEventHandler;
  error?: FieldError;
  ref?: RefCallBack;
}) {
  return (
    <>
      <Input ref={ref} type="text" value={value} onChange={onChange} />
      {error && <span className="error-message">{error.message}</span>}
    </>
  );
}

export default FormDemo;
