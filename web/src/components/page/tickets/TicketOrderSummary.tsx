import { CreateTicketsResponse } from '@raffle-tracker/dto';
import clsx from 'clsx';

interface TicketOrderSummaryProps {
  eventName: string;
  tickets: CreateTicketsResponse[];
}

const TicketOrderSummary = ({
  eventName,
  tickets,
}: TicketOrderSummaryProps) => {
  const orderId = tickets[0]?.orderId;
  return (
    <div className={styles.orderSummary}>
      <div className={styles.header}>
        <h1>{eventName}</h1>
        <h1>Order ID: {orderId}</h1>
      </div>
      <ul className={styles.tickets}>
        {tickets.map(ticket => (
          <li
            key={ticket.ref}
            className={styles.ticket}
          >
            <span>{ticket.date}</span>
            <span>Contest: {ticket.contest}</span>
            <span>Horse: {ticket.horse}</span>
            <span>Ref #: {ticket.ref}</span>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>footer</div>
    </div>
  );
};

const styles = {
  footer: clsx('text-center'),
  header: clsx(
    'flex',
    'flex-row',
    'justify-between',
    'text-xl',
    'font-bold',
    'mb-4',
    'gap-4',
    'px-4'
  ),
  orderSummary: clsx(
    'flex',
    'flex-col',
    'min-h-[5.5in]',
    'px-[1.5in]',
    'py-[0.5in]',
    'box-border',
    'print:break-inside-avoid'
  ),
  ticket: clsx('flex', 'flex-row', 'gap-4', 'justify-between'),
  tickets: clsx('flex-grow'),
  title: clsx('text-xl', 'font-bold', 'mb-4'),
};

export default TicketOrderSummary;
