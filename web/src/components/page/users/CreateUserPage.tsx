'use client';

import { createUserAction } from '@/app/actions/users';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import SimpleButton from '@/components/ui/SimpleButton';
import { useInitializedForm } from '@/hooks/useInitializedForm';
import { userValidationRules } from '@/utils/validationUtility';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateUserPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useInitializedForm<{ username: string; password: string }>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    try {
      setError(null);
      const result = await createUserAction(data.username, data.password);
      if (!result.success) {
        setError(
          result.error || 'An error occurred. Please contact an administrator.'
        );
        return;
      }

      toast.success('User created!');
      if (result.data) {
        router.push(`/users/${result.data.id}`);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred. Please contact an administrator.'
      );
    }
  };

  return (
    <>
      <Card title="Create User">
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabeledField
            label="Username"
            htmlFor="username"
            error={errors.username?.message}
          >
            <Input
              {...register('username', {
                required: userValidationRules.username.required,
                minLength: {
                  value: userValidationRules.username.minLength.value,
                  message: userValidationRules.username.minLength.message,
                },
              })}
              id="username"
              placeholder="Username"
              type="text"
              autoComplete="username"
            />
          </LabeledField>
          <LabeledField
            label="Password"
            htmlFor="password"
            error={errors.password?.message}
          >
            <Input
              {...register('password', {
                required: userValidationRules.password.required,
                minLength: {
                  value: userValidationRules.password.minLength.value,
                  message: userValidationRules.password.minLength.message,
                },
              })}
              id="password"
              placeholder="Password"
              type="password"
              autoComplete="new-password"
            />
          </LabeledField>
          <SimpleButton
            className="mt-4"
            title="Submit"
            type="submit"
          >
            Create User
          </SimpleButton>
        </form>
      </Card>
    </>
  );
}

const styles = {
  error: clsx('text-red-500', 'mb-4'),
};
