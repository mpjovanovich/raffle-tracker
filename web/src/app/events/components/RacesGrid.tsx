'use client';

import { useInitializedForm } from '@/app/hooks/useInitializedForm';
import Card from '@/app/ui/Card';
import IconButton from '@/app/ui/IconButton';
import Input from '@/app/ui/Input';
import ItemList from '@/app/ui/ItemList';
import ItemListItem from '@/app/ui/ItemListItem';
import LabeledField from '@/app/ui/LabeledField';
import SimpleButton from '@/app/ui/SimpleButton';
import { addRace, deleteRace } from '@/services/raceService';
import { CreateRaceRequest, Event, Race } from '@horse-race-raffle-tracker/dto';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPenToSquare, FaXmark } from 'react-icons/fa6';

interface RacesGridProps {
  event: Event;
}

export default function RacesGrid({ event }: RacesGridProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const maxRaceNumber =
    event.races?.reduce(
      (max, race) => (race.number > max ? race.number : max),
      0
    ) ?? 0;

  const {
    formState: { errors },
    handleSubmit,
    isInitialized,
    register,
    setValue,
  } = useInitializedForm<CreateRaceRequest>({
    defaultValues: {
      raceNumber: 1,
      numberOfHorses: 1,
    },
    mode: 'onBlur',
  });

  // Whenever new races are added and the component is re-rendered,
  // the race number should be set to the highest race number + 1.
  useEffect(() => {
    setValue('raceNumber', maxRaceNumber + 1);
  }, [maxRaceNumber, setValue]);

  const handleDeleteRace = async (race: Race) => {
    if (confirm(`Are you sure you want to delete Race ${race.number}?`)) {
      try {
        await deleteRace(race.id);
        router.push(`/events/${event.id}`);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'An error occurred. Please contact an administrator.'
        );
      }
    }
  };

  const onSubmit = async (data: CreateRaceRequest) => {
    try {
      setIsSaving(true);
      setError(null);
      await addRace(event.id, data.raceNumber, data.numberOfHorses);
      router.push(`/events/${event.id}`);
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

  const RaceAdd = () => {
    return (
      <form
        className={styles.raceAdd}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
      >
        <LabeledField
          label="Race Number:"
          htmlFor="raceNumber"
          className={styles.raceAddLabeledField}
          error={errors.raceNumber?.message}
        >
          <Input
            type="number"
            id="raceNumber"
            className={styles.raceAddLabeledFieldNumber}
            {...register('raceNumber', {
              required: 'Race number is required',
              min: {
                value: 1,
                message: 'Race number must be at least 1',
              },
              valueAsNumber: true,
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
            className={styles.raceAddLabeledFieldNumber}
            {...register('numberOfHorses', {
              required: 'Number of horses is required',
              min: {
                value: 1,
                message: 'Number of horses must be at least 1',
              },
              valueAsNumber: true,
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
      </form>
    );
  };

  return (
    <div className={styles.raceContainer}>
      <Card title="Races">
        {error && <p className={styles.error}>{error}</p>}
        {isInitialized ? (
          <ItemList>
            {event.races?.map(race => (
              <ItemListItem key={race.id}>
                <span>Race {race.number}</span>
                <div className={styles.actionButtonContainer}>
                  <Link href={`/events/${event.id}/races/${race.id}`}>
                    <IconButton title="Edit">
                      <FaPenToSquare />
                    </IconButton>
                  </Link>
                  <IconButton
                    title="Delete"
                    onClick={() => {
                      handleDeleteRace(race);
                    }}
                  >
                    <FaXmark />
                  </IconButton>
                </div>
              </ItemListItem>
            ))}
          </ItemList>
        ) : (
          <div>Loading...</div>
        )}
      </Card>
      <RaceAdd />
    </div>
  );
}

const styles = {
  actionButtonContainer: clsx('flex', 'flex-row', 'gap-1'),
  error: clsx('text-red-500'),
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
