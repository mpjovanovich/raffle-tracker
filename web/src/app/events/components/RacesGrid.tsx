'use client';

import clsx from 'clsx';
import Card from '@/app/ui/Card';
import ItemList from '@/app/ui/ItemList';
import ItemListItem from '@/app/ui/ItemListItem';
import LabeledField from '@/app/ui/LabeledField';
import Link from 'next/link';
import Input from '@/app/ui/Input';
import IconButton from '@/app/ui/IconButton';
import SimpleButton from '@/app/ui/SimpleButton';
import { addRaces, deleteRace } from '@/services/events';
import { CreateRacesRequest, Event } from '@horse-race-raffle-tracker/dto';
import { useInitializedForm } from '@/app/hooks/useInitializedForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';

interface RacesGridProps {
  event: Event;
}

export default function RacesGrid({ event }: RacesGridProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const maxRaceNumber =
    event.races?.reduce(
      (max, race) => (race.raceNumber > max ? race.raceNumber : max),
      1
    ) ?? 1;

  const {
    formState: { errors },
    handleSubmit,
    isInitialized,
    register,
    setValue,
  } = useInitializedForm<CreateRacesRequest>({
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

  const onSubmit = async (data: CreateRacesRequest) => {
    try {
      setIsSaving(true);
      setError(null);
      await addRaces(event.id, data.raceNumber, data.numberOfHorses);
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
                <Link
                  className={styles.itemListLink}
                  href={`/events/${event.id}/races/${race.id}`}
                >
                  Race {race.raceNumber}
                </Link>
                <IconButton
                  onClick={async () => {
                    if (
                      confirm(
                        `Are you sure you want to delete Race ${race.raceNumber}?`
                      )
                    ) {
                      try {
                        await deleteRace(event.id, race.id);
                        router.push(`/events/${event.id}`);
                      } catch (error) {
                        setError(
                          error instanceof Error
                            ? error.message
                            : 'An error occurred. Please contact an administrator.'
                        );
                      }
                    }
                  }}
                >
                  <FaTrash />
                </IconButton>
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
  error: clsx('text-red-500'),
  itemListLink: clsx('w-full', 'px-6', 'py-1'),
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
