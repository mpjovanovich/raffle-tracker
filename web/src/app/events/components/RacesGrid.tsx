'use client';

import Card from '@/app/ui/Card';
import ItemList from '@/app/ui/ItemList';
import ItemListItem from '@/app/ui/ItemListItem';
import LabeledField from '@/app/ui/LabeledField';
import Input from '@/app/ui/Input';
import SimpleButton from '@/app/ui/SimpleButton';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface RaceFormData {
  raceNumber: number;
  numberOfHorses: number;
}

interface RacesGridProps {
  eventId: number;
}

export default function RacesGrid({ eventId }: RacesGridProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RaceFormData>({
    defaultValues: {
      raceNumber: 1,
      numberOfHorses: 1,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: RaceFormData) => {
    const submissionData = { eventId: eventId, ...data };

    try {
      setIsSaving(true);
      console.log(submissionData);
      // updatedEvent = await upsertEvent(updatedEvent);
      // router.push(`/events/${updatedEvent.id}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred. Please contact an administrator.'
      );
    }
  };

  return (
    <form
      className={styles.raceContainer}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Card title="Races">
        <ItemList>
          <ItemListItem>Stuff</ItemListItem>
        </ItemList>
      </Card>
      <div className={styles.raceAdd}>
        <LabeledField
          label="Race Number:"
          htmlFor="raceNumber"
          className={styles.raceAddLabeledField}
          error={errors.raceNumber?.message}
        >
          <Input
            type="number"
            id="raceNumber"
            min={1}
            className={styles.raceAddLabeledFieldNumber}
            {...register('raceNumber', {
              required: 'Race number is required',
              min: {
                value: 1,
                message: 'Race number must be at least 1',
              },
            })}
          />
        </LabeledField>
        <LabeledField
          label="Number of Horses:"
          htmlFor="numberOfHorses"
          className={styles.raceAddLabeledField}
          error={errors.numberOfHorses?.message}
        >
          <Input
            type="number"
            id="numberOfHorses"
            min={1}
            className={styles.raceAddLabeledFieldNumber}
            {...register('numberOfHorses', {
              required: 'Number of horses is required',
              min: {
                value: 1,
                message: 'Number of horses must be at least 1',
              },
            })}
          />
        </LabeledField>
        <SimpleButton
          className={styles.raceAddButton}
          type="submit"
          disabled={isSaving}
        >
          Add
        </SimpleButton>
      </div>
    </form>
  );
}

const styles = {
  raceAdd: clsx(
    'border-t-2',
    'border-light-accent2',
    'flex',
    'flex-row',
    'gap-4',
    'px-8'
  ),
  raceAddButton: clsx('my-2', 'h-fit'),
  raceAddLabeledField: clsx('flex-row', 'items-center', 'justify-end', 'm-0'),
  raceAddLabeledFieldNumber: clsx('w-1/4'),
  raceContainer: clsx('border-2', 'border-light-accent2', 'rounded-sm', 'm-6'),
};
