'use client';

import { upsertEventAction } from '@/app/actions/events';
import IconButton from '@/components/ui/IconButton';
import Input from '@/components/ui/Input';
import LabeledField from '@/components/ui/LabeledField';
import { useInitializedForm } from '@/hooks/useInitializedForm';
import { Event } from '@raffle-tracker/dto';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaPenToSquare, FaRegFloppyDisk, FaXmark } from 'react-icons/fa6';
type EventFormData = Omit<Event, 'id'>;

interface EventDetailsProps {
  mode: 'create' | 'edit' | 'view';
  event: Event;
}

export default function EventDetails({ mode, event }: EventDetailsProps) {
  const { id, ...defaultValues } = event;
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const isReadOnly = mode === 'view';

  const {
    formState: { errors },
    handleSubmit,
    isInitialized,
    register,
  } = useInitializedForm<EventFormData>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = async (data: EventFormData) => {
    let updatedEvent: Event = { id, ...data };

    try {
      setError(null);
      setIsSaving(true);
      updatedEvent = await upsertEventAction(updatedEvent);
      router.push(`/events/${updatedEvent.id}`);
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
                mode === 'create'
                  ? router.push(`/events`)
                  : router.push(`/events/${event.id}`);
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
              router.push(`/events/${event.id}/edit`);
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
          label="Name"
          htmlFor="name"
          error={errors.name?.message}
        >
          <Input
            {...register('name', { required: 'Name is required' })}
            id="name"
            placeholder="Name"
            type="text"
            readOnly={isReadOnly}
          />
        </LabeledField>
        <LabeledField
          label="Location"
          htmlFor="location"
          error={errors.location?.message}
        >
          <Input
            {...register('location', { required: 'Location is required' })}
            id="location"
            placeholder="Location"
            type="text"
            readOnly={isReadOnly}
          />
        </LabeledField>
        <LabeledField
          label="Start Date"
          htmlFor="startDate"
          error={errors.startDate?.message}
        >
          <Input
            {...register('startDate', { required: 'Start date is required' })}
            id="startDate"
            type="date"
            placeholder="Start Date"
            readOnly={isReadOnly}
          />
        </LabeledField>
        <LabeledField
          label="End Date"
          htmlFor="endDate"
          error={errors.endDate?.message}
        >
          <Input
            {...register('endDate', { required: 'End date is required' })}
            id="endDate"
            type="date"
            placeholder="End Date"
            readOnly={isReadOnly}
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
