'use client';

import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import SimpleButton from '@/components/ui/SimpleButton';
import clsx from 'clsx';

export default function LoginPage() {
  return (
    <div className={styles.loginFormContainer}>
      <form className={styles.loginForm}>
        <LabeledField
          label="Username"
          htmlFor="username"
          //   error={errors.name?.message}
        >
          <Input
            // {...register('name', { required: 'Name is required' })}
            id="username"
            placeholder="Username"
            type="text"
            // readOnly={isReadOnly}
          />
        </LabeledField>
        <LabeledField
          label="Password"
          htmlFor="password"
          //   error={errors.name?.message}
        >
          <Input
            // {...register('name', { required: 'Name is required' })}
            id="password"
            placeholder="Password"
            type="password"
            // readOnly={isReadOnly}
          />
        </LabeledField>
        <SimpleButton type="submit">Login</SimpleButton>
      </form>
    </div>
  );
}

const styles = {
  loginFormContainer: clsx('flex', 'justify-center', 'm-20'),
  loginForm: clsx('flex', 'flex-col', 'gap-2', 'w-80'),
};
