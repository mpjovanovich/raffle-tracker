'use client';

import IconButton from '@/app/ui/IconButton';
import Input from '@/app/ui/Input';
import LabeledField from '@/app/ui/LabeledField';
import { FaRegFloppyDisk } from 'react-icons/fa6';
import { Event } from '@horse-race-raffle-tracker/dto';
import { useForm } from 'react-hook-form';

type EventFormData = Omit<Event, 'id'>;

interface EventDetailsProps {
  event: Event;
}

// TODO: when in read mode bg should be light gray as it is now.
// When in edit mode, bg should be white as it is on focus

export default function EventDetails({ event }: EventDetailsProps) {
  const { id, ...defaultValues } = event;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  console.log(defaultValues.name);

  return (
    <form>
      <div className="flex justify-end mb-2">
        <IconButton
          title="Save"
          type="submit"
          onClick={e => {
            e.preventDefault();
            console.log('saving...');
          }}
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
