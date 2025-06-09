'use client';

import { useInitializedForm } from '@/app/hooks/useInitializedForm';
import Card from '@/app/ui/Card';
import IconButton from '@/app/ui/IconButton';
import Input from '@/app/ui/Input';
import ItemList from '@/app/ui/ItemList';
import ItemListItem from '@/app/ui/ItemListItem';
import LabeledField from '@/app/ui/LabeledField';
import SimpleButton from '@/app/ui/SimpleButton';
import { addContest, deleteContest } from '@/services/contestService';
import { Contest, CreateContestRequest, Event } from '@raffle-tracker/dto';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPenToSquare, FaXmark } from 'react-icons/fa6';

interface ContestsGridProps {
  event: Event;
}

export default function ContestsGrid({ event }: ContestsGridProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const maxContestNumber =
    event.contests?.reduce(
      (max, contest) => (contest.number > max ? contest.number : max),
      0
    ) ?? 0;

  const {
    formState: { errors },
    handleSubmit,
    isInitialized,
    register,
    setValue,
  } = useInitializedForm<CreateContestRequest>({
    defaultValues: {
      contestNumber: 1,
      numberOfHorses: 1,
    },
    mode: 'onBlur',
  });

  // Whenever new contests are added and the component is re-rendered,
  // the contest number should be set to the highest contest number + 1.
  useEffect(() => {
    setValue('contestNumber', maxContestNumber + 1);
  }, [maxContestNumber, setValue]);

  const handleDeleteContest = async (contest: Contest) => {
    if (confirm(`Are you sure you want to delete Contest ${contest.number}?`)) {
      try {
        await deleteContest(contest.id);
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

  const onSubmit = async (data: CreateContestRequest) => {
    try {
      setIsSaving(true);
      setError(null);
      await addContest(event.id, data.contestNumber, data.numberOfHorses);
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

  const ContestAdd = () => {
    return (
      <form
        className={styles.itemAdd}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
      >
        <LabeledField
          label="Contest Number:"
          htmlFor="contestNumber"
          className={styles.itemAddLabeledField}
          error={errors.contestNumber?.message}
        >
          <Input
            type="number"
            id="contestNumber"
            className={styles.itemAddLabeledFieldNumber}
            {...register('contestNumber', {
              required: 'Contest number is required',
              min: {
                value: 1,
                message: 'Contest number must be at least 1',
              },
              valueAsNumber: true,
            })}
          />
        </LabeledField>
        <LabeledField
          label="Number of Horses:"
          htmlFor="numberOfHorses"
          className={styles.itemAddLabeledField}
          error={errors.numberOfHorses?.message}
        >
          <Input
            type="number"
            id="numberOfHorses"
            className={styles.itemAddLabeledFieldNumber}
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
    <div className={styles.contestContainer}>
      <Card title="Contests">
        {error && <p className={styles.error}>{error}</p>}
        {isInitialized ? (
          <ItemList>
            {event.contests?.map(contest => (
              <ItemListItem key={contest.id}>
                <span>Contest {contest.number}</span>
                <div className={styles.actionButtonContainer}>
                  <Link href={`/events/${event.id}/contests/${contest.id}`}>
                    <IconButton title="Edit">
                      <FaPenToSquare />
                    </IconButton>
                  </Link>
                  <IconButton
                    title="Delete"
                    onClick={() => {
                      handleDeleteContest(contest);
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
      <ContestAdd />
    </div>
  );
}

const styles = {
  actionButtonContainer: clsx('flex', 'flex-row', 'gap-1'),
  error: clsx('text-red-500'),
  itemAdd: clsx(
    'border-t-2',
    'border-light-accent2',
    'flex',
    'flex-row',
    'justify-end',
    'gap-4',
    'px-8'
  ),
  itemAddButton: clsx('my-2', 'h-fit'),
  itemAddLabeledField: clsx('flex-row', 'items-center', 'justify-end', 'm-0'),
  itemAddLabeledFieldNumber: clsx('w-20'),
  contestContainer: clsx(
    'border-2',
    'border-light-accent2',
    'rounded-sm',
    'm-6'
  ),
};
