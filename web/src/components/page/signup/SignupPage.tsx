'use client';

import { signupAction } from '@/app/actions/auth';
import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import SimpleButton from '@/components/ui/SimpleButton';
import { useInitializedForm } from '@/hooks/useInitializedForm';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
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
      email: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: { username: string; email: string }) => {
    try {
      setError(null);
      setIsSaving(true);

      // Should redirect to login page with success message.
      await signupAction(data.email, data.username);
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
          label="Email"
          htmlFor="email"
          error={errors.email?.message}
        >
          <Input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                message: 'Please enter a valid email address',
              },
            })}
            id="email"
            placeholder="Email"
            type="email"
            disabled={isSaving}
          />
        </LabeledField>
        <LabeledField
          label="Choose a username"
          htmlFor="username"
          error={errors.username?.message}
        >
          <Input
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 5,
                message: 'Username must be at least 5 characters long',
              },
              maxLength: {
                value: 20,
                message: 'Username must be at most 20 characters long',
              },
            })}
            id="username"
            placeholder="Username"
            type="text"
            disabled={isSaving}
          />
        </LabeledField>
        <SimpleButton
          type="submit"
          disabled={isSaving}
        >
          Sign Up
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
