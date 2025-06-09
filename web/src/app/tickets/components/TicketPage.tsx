'use client';

import { useInitializedForm } from '@/app/hooks/useInitializedForm';
import Card from '@/app/ui/Card';
import Input from '@/app/ui/Input';
import LabeledField from '@/app/ui/LabeledField';
import SimpleButton from '@/app/ui/SimpleButton';
import { Contest, Event } from '@raffle-tracker/dto';
import clsx from 'clsx';
import { useState } from 'react';

interface TicketPageProps {
  contests: Contest[];
  event: Event;
}

export default function TicketPage({ contests, event }: TicketPageProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

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
    //   } = useInitializedForm<CreateContestRequest>({
  } = useInitializedForm({
    defaultValues: {
      contestNumber: 1,
      quantity: 1,
    },
    mode: 'onBlur',
  });

  const TicketsAdd = () => {
    return (
      <form
        className={styles.itemAdd}
        onSubmit={e => {
          e.preventDefault();
          //   handleSubmit(onSubmit)(e);
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
          label="Quantity:"
          htmlFor="quantity"
          className={styles.itemAddLabeledField}
          error={errors.quantity?.message}
        >
          <Input
            type="number"
            id="quantity"
            className={styles.itemAddLabeledFieldNumber}
            {...register('quantity', {
              required: 'Quantity is required',
              min: {
                value: 1,
                message: 'Quantity must be at least 1',
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
    <>
      <Card
        title={`Tickets: ${event.name}`}
        className={styles.card}
      >
        <h2 className={styles.addTicketsTitle}>Shopping Cart</h2>
        <div className={styles.orderScreen}></div>
        <TicketsAdd />
        {/* Cancel / Confirm */}
      </Card>
    </>
  );
}

const styles = {
  addTicketsTitle: clsx('text-xl', 'px-4'),
  card: clsx('flex', 'flex-col', 'gap-4'),
  itemAdd: clsx(
    'flex',
    'flex-row',
    'justify-end',
    'items-center',
    'gap-4',
    'w-full'
  ),
  itemAddButton: clsx('my-2', 'h-fit'),
  itemAddLabeledField: clsx('flex', 'flex-row', 'items-center', 'm-0'),
  itemAddLabeledFieldNumber: clsx('w-20'),
  orderScreen: clsx(
    'flex',
    'flex-row',
    'justify-between',
    'items-center',
    'border-2',
    'border-light-accent2',
    'rounded-sm',
    'p-4',
    'min-h-[200px]',
    'h-[40vh]'
  ),
};
