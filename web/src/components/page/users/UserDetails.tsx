'use client';

import { updateUserAction } from '@/app/actions/users';
import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import { useInitializedForm } from '@/hooks/useInitializedForm';
import { User } from '@raffle-tracker/dto';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
type UserFormData = Omit<User, 'id'>;

interface UserDetailsProps {
  user: User;
}

// Right now there is nothing you can edit on this control.
// Eventually we will add some more view fields, active toggle, etc.
export default function UserDetails({ user }: UserDetailsProps) {
  // This is a nasty workaround; in future we can set the linter config to
  // ignore _ named vars.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, roles: _, ...defaultValues } = user;
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const {
    formState: { errors },
    isInitialized,
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useInitializedForm<UserFormData>({
    defaultValues: user,
    mode: 'onBlur',
  });

  const onSubmit = async (data: UserFormData) => {
    const updatedUser: User = { id, ...data };

    try {
      setError(null);
      setIsSaving(true);

      const result = await updateUserAction(updatedUser);
      if (!result.success) {
        setError(
          result.error || 'An error occurred. Please contact an administrator.'
        );
        return;
      }

      if (result.data) {
        router.push(`/users/${result.data.id}`);
      }
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

  const FormContent = () => {
    return (
      <div className={styles.formContent}>
        <LabeledField
          label="Active"
          htmlFor="active"
          error={errors.active?.message}
          className={clsx('flex-row', 'justify-between', 'w-3xs', 'mb-4')}
        >
          <Input
            {...register('active')}
            id="active"
            type="checkbox"
            className="accent-[var(--dark-accent)]"
            onChange={e => {
              setValue('active', e.target.checked);
              const form = e.target.form;
              if (form) {
                form.requestSubmit();
              }
            }}
          />
        </LabeledField>
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
            readOnly={true}
          />
        </LabeledField>
        <LabeledField
          label="Latest Login Date"
          htmlFor="latestLoginDate"
        >
          <Input
            {...register('latestLoginDate')}
            id="latestLoginDate"
            type="date"
            placeholder="Latest Login Date"
            readOnly={true}
          />
        </LabeledField>
      </div>
    );
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className={styles.error}>{error}</p>}
      <FormContent />
    </form>
  );
}

const styles = {
  editButtons: clsx('flex', 'justify-end', 'mb-2'),
  error: clsx('text-red-500'),
  formContent: clsx('flex', 'flex-col', 'gap-2'),
};
