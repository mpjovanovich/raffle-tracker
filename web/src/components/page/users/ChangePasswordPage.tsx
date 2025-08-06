'use client';

import { changePasswordAction } from '@/app/actions/users';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import SimpleButton from '@/components/ui/SimpleButton';
import { useInitializedForm } from '@/hooks/useInitializedForm';
import { userValidationRules } from '@/utils/validationUtility';
import { User } from '@raffle-tracker/dto';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ChangePasswordPageProps {
  user: User;
}

export default function ChangePasswordPage({ user }: ChangePasswordPageProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useInitializedForm<{ newPassword: string }>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: { newPassword: string }) => {
    console.log(data);

    try {
      setError(null);
      const result = await changePasswordAction(user.id, data.newPassword);
      if (!result.success) {
        setError(
          result.error || 'An error occurred. Please contact an administrator.'
        );
        return;
      }

      toast.success('Password changed successfully!');
      router.push(`/users/${user.id}`);
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
      <Card title={`User: ${user.username}`}>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <LabeledField
            label="New Password"
            htmlFor="newPassword"
            error={errors.newPassword?.message}
          >
            <Input
              {...register('newPassword', {
                required: userValidationRules.password.required,
                minLength: {
                  value: userValidationRules.password.minLength.value,
                  message: userValidationRules.password.minLength.message,
                },
              })}
              id="newPassword"
              placeholder="New Password"
              type="password"
              autoComplete="current-password"
            />
          </LabeledField>
          <SimpleButton
            className="mt-4"
            title="Submit"
            type="submit"
          >
            Change Password
          </SimpleButton>
        </form>
      </Card>
    </>
  );
}

const styles = {
  error: clsx('text-red-500'),
};
