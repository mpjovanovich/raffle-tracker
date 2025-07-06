'use client';

import { loginAction } from '@/app/actions/auth';
import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import SimpleButton from '@/components/ui/SimpleButton';
import { useInitializedForm } from '@/hooks/useInitializedForm';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [pageMessage, setPageMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const searchParams = useSearchParams();
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

  // Clean the URL of any message that was passed in
  const cleanUrl = () => {
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.delete('message');
    window.history.replaceState({}, '', newUrl.toString());
  };

  // Check for success message in URL on component mount
  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setPageMessage(message);
      cleanUrl();
    }
  }, [searchParams]);

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      setError(null);
      setIsSaving(true);
      await loginAction(data.username, data.password);
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
        {pageMessage && <p className={styles.error}>{pageMessage}</p>}
        <LabeledField
          label="Username"
          htmlFor="username"
          error={errors.username?.message}
        >
          <Input
            {...register('username', { required: 'Username is required' })}
            id="username"
            autoComplete="username"
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
            type="password"
            autoComplete="current-password"
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
      <Link
        className={styles.link}
        href="/signup"
      >
        Sign up
      </Link>
      <Link
        className={styles.link}
        href="/forgot-password"
      >
        Forgot password?
      </Link>
    </div>
  );
}

const styles = {
  error: clsx('text-red-500'),
  loginFormContainer: clsx(
    'flex',
    'flex-col',
    'justify-center',
    'm-20',
    'items-center'
  ),
  link: clsx('hover:text-dark-accent', 'font-bold', 'mt-2'),
  loginForm: clsx('flex', 'flex-col', 'gap-2', 'w-80', 'mb-4'),
};
