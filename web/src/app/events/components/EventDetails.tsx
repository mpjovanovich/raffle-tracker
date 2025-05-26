'use client';

import IconButton from '@/app/ui/IconButton';
import Input from '@/app/ui/Input';
import LabeledField from '@/app/ui/LabeledField';
import { Event } from '@horse-race-raffle-tracker/dto';
import { FaPenToSquare, FaRegFloppyDisk, FaXmark } from 'react-icons/fa6';
import { upsertEvent } from '@/services/events';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
type EventFormData = Omit<Event, 'id'>;

interface EventDetailsProps {
  mode: 'create' | 'edit' | 'view';
  event: Event;
}

export default function EventDetails({ mode, event }: EventDetailsProps) {
  const { id, ...defaultValues } = event;
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const isDisabled = mode === 'view';

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<EventFormData>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  // TODO: may have to hoist this to the parent component; will have a races grid
  // underneath this component that also needs to be loaded.
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onSubmit = async (data: EventFormData) => {
    let updatedEvent: Event = { id, ...data };

    try {
      console.log('Saving event', updatedEvent);
      setIsSaving(true);
      updatedEvent = await upsertEvent(updatedEvent);
      router.push(`/events/${updatedEvent.id}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred. Please contact an administrator.'
      );
    }
  };

  const getEditButtons = () => {
    return (
      <div className="flex justify-end mb-2">
        {mode === 'edit' || mode === 'create' ? (
          <>
            <IconButton
              title="Save"
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
            onClick={e => {
              router.push(`/events/${event.id}/edit`);
              e.preventDefault();
            }}
            disabled={isSaving}
          >
            <FaPenToSquare />
          </IconButton>
        )}
      </div>
    );
  };

  const getFormContent = () => {
    return (
      <>
        {getEditButtons()}
        <LabeledField
          label="Name"
          htmlFor="name"
          error={errors.name?.message}
        >
          <Input
            {...register('name', { required: 'Name is required' })}
            placeholder="Name"
            type="text"
            disabled={isDisabled}
          />
        </LabeledField>
        <LabeledField
          label="Location"
          htmlFor="location"
          error={errors.location?.message}
        >
          <Input
            {...register('location', { required: 'Location is required' })}
            placeholder="Location"
            type="text"
            disabled={isDisabled}
          />
        </LabeledField>
        <LabeledField
          label="Start Date"
          htmlFor="startDate"
          error={errors.startDate?.message}
        >
          <Input
            {...register('startDate', { required: 'Start date is required' })}
            type="date"
            placeholder="Start Date"
            disabled={isDisabled}
          />
        </LabeledField>
        <LabeledField
          label="End Date"
          htmlFor="endDate"
          error={errors.endDate?.message}
        >
          <Input
            {...register('endDate', { required: 'End date is required' })}
            type="date"
            placeholder="End Date"
            disabled={isDisabled}
          />
        </LabeledField>
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? <p>Loading...</p> : getFormContent()}
    </form>
  );
}
