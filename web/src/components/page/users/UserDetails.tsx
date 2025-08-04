'use client';

import { upsertUserAction } from '@/app/actions/users';
import IconButton from '@/components/ui/IconButton';
import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import { useInitializedForm } from '@/hooks/useInitializedForm';
import { User } from '@raffle-tracker/dto';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaPenToSquare, FaRegFloppyDisk, FaXmark } from 'react-icons/fa6';
type UserFormData = Omit<User, 'id' | 'roles'>;

interface UserDetailsProps {
  mode: 'create' | 'edit' | 'view';
  user: User;
}

// Right now there is nothing you can edit on this control.
// Eventually we will add some more view fields, active toggle, etc.
export default function UserDetails({ mode, user }: UserDetailsProps) {
  const { id, roles, ...defaultValues } = user;
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const isReadOnly = mode === 'view';

  const {
    formState: { errors },
    handleSubmit,
    isInitialized,
    register,
  } = useInitializedForm<UserFormData>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = async (data: UserFormData) => {
    const updatedUser: User = { id, ...data };

    try {
      // DEBUG
      console.log(updatedUser);

      setError(null);
      setIsSaving(true);
      const result = await upsertUserAction(updatedUser);

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

  const EditButtons = () => {
    return (
      <div className={styles.editButtons}>
        {mode === 'edit' || mode === 'create' ? (
          <>
            <IconButton
              title="Save"
              type="submit"
              disabled={isSaving}
            >
              <FaRegFloppyDisk />
            </IconButton>
            <IconButton
              title="Cancel"
              type="button"
              onClick={e => {
                if (mode === 'create') {
                  router.push(`/users`);
                } else {
                  router.push(`/users/${user.id}`);
                }
                e.preventDefault();
              }}
              disabled={isSaving}
            >
              <FaXmark />
            </IconButton>
          </>
        ) : (
          <IconButton
            title="Edit"
            type="button"
            disabled={isSaving}
            onClick={() => {
              router.push(`/users/${user.id}/edit`);
            }}
          >
            <FaPenToSquare />
          </IconButton>
        )}
      </div>
    );
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
            disabled={isReadOnly}
            className={
              isReadOnly ? 'cursor-not-allowed' : 'accent-[var(--dark-accent)]'
            }
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
            // Only allow editing if the user is creating a new user
            readOnly={isReadOnly || mode === 'edit'}
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
        {/* <LabeledField
          label="Failed Login Attempts"
          htmlFor="failedLoginAttempts"
          error={errors.failedLoginAttempts?.message}
        >
          <Input
            {...register('failedLoginAttempts')}
            id="failedLoginAttempts"
            type="number"
            placeholder="Failed Login Attempts"
            readOnly={true}
          />
        </LabeledField>
        <LabeledField
          label="Locked Until"
          htmlFor="lockedUntil"
          error={errors.lockedUntil?.message}
        >
          <Input
            {...register('lockedUntil')}
            id="ticketPrice"
            type="date"
            placeholder="Locked Until"
            readOnly={true}
          />
        </LabeledField> */}
      </div>
    );
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className={styles.error}>{error}</p>}
      <EditButtons />
      <FormContent />
    </form>
  );
}

const styles = {
  editButtons: clsx('flex', 'justify-end', 'mb-2'),
  error: clsx('text-red-500'),
  formContent: clsx('flex', 'flex-col', 'gap-2'),
};
