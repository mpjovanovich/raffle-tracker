'use client';

import {
  addHorseAction,
  deleteHorseAction,
  toggleScratchAction,
  toggleWinnerAction,
} from '@/app/actions/horses';
import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import Input from '@/components/ui/Input';
import ItemList from '@/components/ui/ItemList';
import ItemListItem from '@/components/ui/ItemListItem';
import LabeledField from '@/components/ui/LabeledField';
import SimpleButton from '@/components/ui/SimpleButton';
import { useInitializedForm } from '@/hooks/useInitializedForm';
import { Contest, CreateHorseRequest, Horse } from '@raffle-tracker/dto';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaBan, FaCheck, FaCircleCheck, FaXmark } from 'react-icons/fa6';

interface ContestPageProps {
  contest: Contest;
}

export default function ContestPage({ contest }: ContestPageProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const maxHorseNumber =
    contest.horses?.reduce(
      (max, horse) => (horse.number > max ? horse.number : max),
      1
    ) ?? 1;

  const {
    formState: { errors },
    handleSubmit,
    isInitialized,
    register,
    setValue,
  } = useInitializedForm<CreateHorseRequest>({
    defaultValues: {
      contestId: contest.id,
      number: maxHorseNumber + 1,
    },
    mode: 'onBlur',
  });

  // Whenever new contests are added and the component is re-rendered,
  // the contest number should be set to the highest contest number + 1.
  useEffect(() => {
    setValue('number', maxHorseNumber + 1);
  }, [maxHorseNumber, setValue]);

  const handleDeleteHorse = async (horse: Horse) => {
    if (confirm(`Are you sure you want to delete Horse ${horse.number}?`)) {
      try {
        const result = await deleteHorseAction(horse.id);
        if (result.error) {
          setError(result.error);
          return;
        }
        router.push(`/events/${contest.eventId}/contests/${contest.id}`);
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
      const result = await toggleScratchAction(horse.id);
      if (result.error) {
        setError(result.error);
        return;
      }
      router.push(`/events/${contest.eventId}/contests/${contest.id}`);
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
      const result = await toggleWinnerAction(horse.id);
      if (result.error) {
        setError(result.error);
        return;
      }
      router.push(`/events/${contest.eventId}/contests/${contest.id}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred. Please contact an administrator.'
      );
    }
  };

  const onSubmit = async (data: CreateHorseRequest) => {
    try {
      setIsSaving(true);
      setError(null);
      await addHorseAction(contest.id, data.number);
      router.push(`/events/${contest.eventId}/contests/${contest.id}`);
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

  const HorseAdd = () => {
    return (
      <form
        className={styles.itemAdd}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
      >
        <LabeledField
          label="Horse Number:"
          htmlFor="horseNumber"
          className={styles.itemAddLabeledField}
          error={errors.number?.message}
        >
          <Input
            type="number"
            id="horseNumber"
            className={styles.itemAddLabeledFieldNumber}
            {...register('number', {
              required: 'Horse number is required',
              min: {
                value: 1,
                message: 'Horse number must be at least 1',
              },
              valueAsNumber: true,
            })}
          />
        </LabeledField>
        <SimpleButton
          className={styles.itemAddButton}
          type="submit"
          disabled={isSaving}
        >
          Add
        </SimpleButton>
      </form>
    );
  };

  return (
    <div className={styles.horseContainer}>
      <Card title="Horses">
        {error && <p className={styles.error}>{error}</p>}
        {isInitialized ? (
          <ItemList className={styles.itemList}>
            {contest.horses?.map(horse => (
              <ItemListItem key={horse.id}>
                <span>Horse {horse.number}</span>
                <div className={styles.actionButtonContainer}>
                  <IconButton
                    title="Winner"
                    className={clsx(horse.winner && styles.winner)}
                    disabled={horse.scratch}
                    onClick={() => {
                      handleToggleWinner(horse);
                    }}
                  >
                    {horse.winner ? <FaCircleCheck /> : <FaCheck />}
                  </IconButton>
                  <IconButton
                    title="Scratch"
                    disabled={horse.winner}
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
      <HorseAdd />
    </div>
  );
}

const styles = {
  actionButtonContainer: clsx('flex', 'flex-row', 'gap-1'),
  error: clsx('text-red-500', 'mx-6', 'mb-2'),
  itemAdd: clsx(
    'border-t-2',
    'border-light-accent2',
    'flex',
    'flex-col',
    'sm:flex-row',
    'justify-end',
    'sm:items-center',
    'gap-4',
    'px-8',
    'py-2'
  ),
  itemAddButton: clsx('h-fit', 'px-8', 'py-2'),
  itemAddLabeledField: clsx('flex-row', 'items-center', 'justify-end', 'm-0'),
  itemAddLabeledFieldNumber: clsx('w-1/4'),
  itemList: clsx('mb-4'),
  horseContainer: clsx(
    'border-2',
    'border-light-accent2',
    'rounded-sm',
    'my-6'
  ),
  scratch: clsx('text-red-500'),
  winner: clsx('text-green-500', 'text-xl'),
};
