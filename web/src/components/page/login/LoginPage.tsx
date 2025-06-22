'use client';

import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import SimpleButton from '@/components/ui/SimpleButton';
import { useInitializedForm } from '@/hooks/useInitializedForm';
import { login } from '@/services/authService';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const {
    formState: { errors },
    handleSubmit,
    isInitialized,
    register,
  } = useInitializedForm({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      setError(null);
      setIsSaving(true);
      await login(data.username, data.password);
      console.log('Login successful');
      router.push('/');
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred. Please contact an administrator.'
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.loginFormContainer}>
      <form
        className={styles.loginForm}
        onSubmit={handleSubmit(onSubmit)}
      >
        {error && <p className={styles.error}>{error}</p>}
        <LabeledField
          label="Username"
          htmlFor="username"
          error={errors.username?.message}
        >
          <Input
            {...register('username', { required: 'Username is required' })}
            id="username"
            placeholder="Username"
            type="text"
            disabled={isSaving}
          />
        </LabeledField>
        <LabeledField
          label="Password"
          htmlFor="password"
          error={errors.password?.message}
        >
          <Input
            {...register('password', { required: 'Password is required' })}
            id="password"
            placeholder="Password"
            type="password"
            disabled={isSaving}
          />
        </LabeledField>
        <SimpleButton
          type="submit"
          disabled={isSaving}
        >
          Login
        </SimpleButton>
      </form>
    </div>
  );
}

const styles = {
  error: clsx('text-red-500'),
  loginFormContainer: clsx('flex', 'justify-center', 'm-20'),
  loginForm: clsx('flex', 'flex-col', 'gap-2', 'w-80'),
};
