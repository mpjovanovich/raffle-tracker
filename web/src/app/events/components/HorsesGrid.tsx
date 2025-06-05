'use client';

import { useInitializedForm } from '@/app/hooks/useInitializedForm';
import Card from '@/app/ui/Card';
import IconButton from '@/app/ui/IconButton';
import ItemList from '@/app/ui/ItemList';
import ItemListItem from '@/app/ui/ItemListItem';
import {
  deleteHorse,
  toggleScratch,
  toggleWinner,
} from '@/services/horseService';
import { Horse, Race } from '@horse-race-raffle-tracker/dto';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBan, FaCheck, FaCircleCheck, FaXmark } from 'react-icons/fa6';

interface HorsesGridProps {
  race: Race;
}

export default function HorsesGrid({ race }: HorsesGridProps) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const maxHorseNumber =
    race.horses?.reduce(
      (max, horse) => (horse.number > max ? horse.number : max),
      1
    ) ?? 1;

  const {
    formState: { errors },
    handleSubmit,
    isInitialized,
    register,
    setValue,
  } = useInitializedForm<Omit<Horse, 'id'>>({
    defaultValues: {
      number: maxHorseNumber + 1,
      raceId: race.id,
      winner: 0,
      scratch: 0,
    },
    mode: 'onBlur',
  });

  // Whenever new races are added and the component is re-rendered,
  // the race number should be set to the highest race number + 1.
  useEffect(() => {
    setValue('number', maxHorseNumber + 1);
  }, [maxHorseNumber, setValue]);

  const handleDeleteHorse = async (horse: Horse) => {
    if (confirm(`Are you sure you want to delete Horse ${horse.number}?`)) {
      try {
        await deleteHorse(horse.id);
        router.push(`/events/${race.eventId}/races/${race.id}`);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : 'An error occurred. Please contact an administrator.'
        );
      }
    }
  };

  const handleToggleScratch = async (horse: Horse) => {
    try {
      await toggleScratch(horse.id);
      router.push(`/events/${race.eventId}/races/${race.id}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred. Please contact an administrator.'
      );
    }
  };

  const handleToggleWinner = async (horse: Horse) => {
    try {
      await toggleWinner(horse.id);
      router.push(`/events/${race.eventId}/races/${race.id}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred. Please contact an administrator.'
      );
    }
  };

  return (
    <div className={styles.horseContainer}>
      <Card title="Horses">
        {error && <p className={styles.error}>{error}</p>}
        {isInitialized ? (
          <ItemList>
            {race.horses?.map(horse => (
              <ItemListItem key={horse.id}>
                <span>Horse {horse.number}</span>
                <div className={styles.actionButtonContainer}>
                  <IconButton
                    title="Winner"
                    className={clsx(horse.winner && styles.winner)}
                    disabled={horse.scratch === 1}
                    onClick={() => {
                      handleToggleWinner(horse);
                    }}
                  >
                    {horse.winner ? <FaCircleCheck /> : <FaCheck />}
                  </IconButton>
                  <IconButton
                    title="Scratch"
                    className={clsx(horse.scratch && styles.scratch)}
                    onClick={() => {
                      handleToggleScratch(horse);
                    }}
                  >
                    <FaBan />
                  </IconButton>
                  <IconButton
                    title="Delete"
                    onClick={() => {
                      handleDeleteHorse(horse);
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
      {/* <HorseAdd /> */}
    </div>
  );
}

const styles = {
  actionButtonContainer: clsx('flex', 'flex-row', 'gap-1'),
  error: clsx('text-red-500'),
  horseAdd: clsx(
    'border-t-2',
    'border-light-accent2',
    'flex',
    'flex-row',
    'gap-4',
    'px-8'
  ),
  horseAddButton: clsx('my-2', 'h-fit'),
  horseAddLabeledField: clsx('flex-row', 'items-center', 'justify-end', 'm-0'),
  horseAddLabeledFieldNumber: clsx('w-1/4'),
  horseContainer: clsx('border-2', 'border-light-accent2', 'rounded-sm', 'm-6'),
  scratch: clsx('text-red-500'),
  winner: clsx('text-green-500', 'text-xl'),
};
