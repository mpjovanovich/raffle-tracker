'use client';

import { useInitializedForm } from '@/app/hooks/useInitializedForm';
import Card from '@/app/ui/Card';
import Input from '@/app/ui/Input';
import ItemList from '@/app/ui/ItemList';
import LabeledField from '@/app/ui/LabeledField';
import Select from '@/app/ui/Select';
import SimpleButton from '@/app/ui/SimpleButton';
import { Contest, CreateTicketsRequest, Event } from '@raffle-tracker/dto';
import clsx from 'clsx';
import { useState } from 'react';

interface TicketPageProps {
  contests: Contest[];
  event: Event;
}

export default function TicketPage({ contests, event }: TicketPageProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [tickets, setTickets] = useState<CreateTicketsRequest[]>([]);

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
  } = useInitializedForm<CreateTicketsRequest>({
    defaultValues: {
      contestId: 1,
      quantity: 1,
    },
    mode: 'onBlur',
  });

  const onTicketAdd = (request: CreateTicketsRequest) => {
    setTickets([...tickets, request]);
  };

  const TicketsAdd = () => {
    return (
      <form
        className={styles.itemAdd}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(onTicketAdd)(e);
        }}
      >
        <LabeledField
          label="Contest Number:"
          htmlFor="contestNumber"
          className={styles.itemAddLabeledField}
          error={errors.contestId?.message}
        >
          <Select
            id="contestNumber"
            className={styles.itemAddLabeledFieldNumber}
            {...register('contestId', {
              required: 'Contest number is required',
            })}
          >
            {contests.map(contest => (
              <option
                key={contest.id}
                value={contest.id}
              >
                {contest.number}
              </option>
            ))}
          </Select>
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
              max: {
                value: 20,
                message: 'Maximum quantity is 20',
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

        <div className={styles.orderScreen}>
          <div className={styles.itemListContainer}>
            <span className={styles.itemListHeader}>Contest</span>
            <span className={styles.itemListHeader}>Quantity</span>
          </div>
          <ItemList className={styles.itemList}>
            {tickets.map(ticket => (
              <div
                key={ticket.contestId}
                className={styles.itemListContainer}
              >
                <span>{ticket.contestId}</span>
                <span>{ticket.quantity}</span>
              </div>
            ))}
          </ItemList>
          <div className={styles.itemListContainer}>
            <span className={styles.itemListSpacer}></span>
            <div className={styles.itemListTotal}>
              <span>Total</span>
              <span>{tickets.length}</span>
            </div>
          </div>
        </div>

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
  itemList: clsx('w-full', 'flex-grow'),
  itemListContainer: clsx('flex', 'flex-row', 'justify-around', 'w-full'),
  itemListHeader: clsx(
    'w-24',
    'px-4',
    'mb-2',
    'border-b-2',
    'border-light-accent2'
  ),
  itemListSpacer: clsx('w-24', 'px-4', 'mb-2'),
  itemListTotal: clsx(
    'px-4',
    'flex',
    'flex-row',
    'justify-end',
    'gap-4',
    'border-t-2',
    'border-light-accent2'
  ),
  orderScreen: clsx(
    'flex',
    'flex-col',
    'items-center',
    'border-2',
    'border-light-accent2',
    'rounded-sm',
    'p-4',
    'min-h-[200px]',
    'h-[40vh]'
  ),
};
