'use client';

import IconButton from '@/app/ui/IconButton';
import Input from '@/app/ui/Input';
import LabeledField from '@/app/ui/LabeledField';
import { FaRegFloppyDisk } from 'react-icons/fa6';
import { Event } from '@horse-race-raffle-tracker/dto';
import { useForm } from 'react-hook-form';
import { upsertEvent } from '@/services/events';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type EventFormData = Omit<Event, 'id'>;

interface EventDetailsProps {
  event: Event;
}

// TODO: when in read mode bg should be light gray as it is now.
// When in edit mode, bg should be white as it is on focus

export default function EventDetails({ event }: EventDetailsProps) {
  const { id, ...defaultValues } = event;
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const onSubmit = async (data: EventFormData) => {
    let updatedEvent: Event = { id, ...data };

    try {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-end mb-2">
        <IconButton
          title="Save"
          type="submit"
        >
          <FaRegFloppyDisk />
        </IconButton>
      </div>
      <LabeledField
        label="Name"
        htmlFor="name"
        error={errors.name?.message}
      >
        <Input
          {...register('name', { required: 'Name is required' })}
          placeholder="Name"
          type="text"
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
        />
      </LabeledField>
    </form>
  );
}
