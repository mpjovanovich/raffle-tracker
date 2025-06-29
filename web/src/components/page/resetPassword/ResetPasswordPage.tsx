'use client';

import { resetPasswordAction } from '@/app/actions/auth';
import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import SimpleButton from '@/components/ui/SimpleButton';
import { useInitializedForm } from '@/hooks/useInitializedForm';
import clsx from 'clsx';
import { useState } from 'react';

interface ResetPasswordPageProps {
  token: string;
}

export default function ResetPasswordPage({ token }: ResetPasswordPageProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    isInitialized,
    register,
    watch,
  } = useInitializedForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setError(null);
      setIsSaving(true);

      // Should redirect to login page with success message.
      await resetPasswordAction(token, data.password);
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
          label="New Password"
          htmlFor="password"
          error={errors.password?.message}
        >
          <Input
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 12,
                message: 'Password must be at least 12 characters long',
              },
              maxLength: {
                value: 64,
                message: 'Password must be at most 64 characters long',
              },
            })}
            id="password"
            placeholder="Password"
            type="password"
            disabled={isSaving}
          />
        </LabeledField>
        <LabeledField
          label="Confirm Password"
          htmlFor="confirmPassword"
          error={errors.confirmPassword?.message}
        >
          <Input
            {...register('confirmPassword', {
              required: 'Password is required',
              minLength: {
                value: 12,
                message: 'Password must be at least 12 characters long',
              },
              maxLength: {
                value: 64,
                message: 'Password must be at most 64 characters long',
              },
              validate: value => {
                if (value !== watch('password')) {
                  return 'Passwords do not match';
                }
                return true;
              },
            })}
            id="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            disabled={isSaving}
          />
        </LabeledField>
        <SimpleButton
          type="submit"
          disabled={isSaving}
        >
          Reset Password
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
