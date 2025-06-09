'use client';

import { useInitializedForm } from '@/app/hooks/useInitializedForm';
import Card from '@/app/ui/Card';
import Input from '@/app/ui/Input';
import ItemList from '@/app/ui/ItemList';
import LabeledField from '@/app/ui/LabeledField';
import Select from '@/app/ui/Select';
import SimpleButton from '@/app/ui/SimpleButton';
import { printTicket } from '@/app/utils/renderTicket';
import { createTickets } from '@/services/ticketService';
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
    setError(null);
    setTickets([...tickets, request]);
  };

  const onTicketSubmit = async () => {
    try {
      setError(null);
      setIsSaving(true);

      // DEBUG - commented for testing
      const createdTickets = await createTickets(tickets);
      printTicket(createdTickets);

      // Reset the form
      setTickets([]);
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

  const TicketSubmit = () => {
    return (
      <form
        onSubmit={handleSubmit(onTicketSubmit)}
        className={styles.submitContainer}
      >
        <SimpleButton
          type="button"
          onClick={() => {
            setTickets([]);
            setError(null);
          }}
        >
          Cancel
        </SimpleButton>
        <SimpleButton
          type="submit"
          disabled={isSaving || tickets.length === 0}
        >
          Confirm
        </SimpleButton>
      </form>
    );
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
              valueAsNumber: true,
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

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card
        title={`Tickets: ${event.name}`}
        className={styles.card}
      >
        {error && <p className={styles.error}>{error}</p>}
        <h2 className={styles.addTicketsTitle}>Shopping Cart</h2>

        <div className={styles.orderScreen}>
          <div className={styles.itemListContainer}>
            <span className={styles.itemListHeader}>Contest</span>
            <span className={styles.itemListHeader}>Quantity</span>
          </div>
          <ItemList className={styles.itemList}>
            {tickets.map((ticket, index) => {
              const contest = contests.find(c => c.id === ticket.contestId);
              return (
                <div
                  // This is here so that react doesn't complain if the same contest is added to the list multiple times.
                  key={`${ticket.contestId}-${index}`}
                  className={styles.itemListContainer}
                >
                  <span>{contest?.number || ticket.contestId}</span>
                  <span>{ticket.quantity}</span>
                </div>
              );
            })}
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
        <TicketSubmit />
      </Card>
    </>
  );
}

const styles = {
  addTicketsTitle: clsx('text-xl', 'px-4'),
  card: clsx('flex', 'flex-col', 'gap-4'),
  error: clsx('text-red-500'),
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
  itemList: clsx('w-full', 'flex-grow', 'overflow-y-auto'),
  itemListContainer: clsx('flex', 'flex-row', 'justify-around', 'w-full'),
  itemListHeader: clsx(
    'w-24',
    'px-4',
    'pb-2',
    'mb-2',
    'border-b-2',
    'border-light-accent2'
  ),
  itemListSpacer: clsx('w-24', 'px-4', 'mb-2'),
  itemListTotal: clsx(
    'px-4',
    'pt-2',
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
    'h-[40vh]',
    'overflow-hidden'
  ),
  submitContainer: clsx('flex', 'flex-row', 'justify-end', 'gap-4'),
};
