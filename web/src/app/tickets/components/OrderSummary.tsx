import { CreateTicketsResponse } from '@raffle-tracker/dto';
import clsx from 'clsx';

interface OrderSummaryProps {
  eventName: string;
  tickets: CreateTicketsResponse[];
}
const OrderSummary = ({ eventName, tickets }: OrderSummaryProps) => {
  console.log('tickets', tickets);
  const orderId = tickets[0]?.orderId;
  return (
    <div className={styles.orderSummary}>
      <h1 className={styles.title}>{eventName}</h1>
      <h1 className={styles.orderId}>Order ID: {orderId}</h1>
      {tickets.map(ticket => (
        <p
          key={ticket.ref}
          className={styles.ticketRef}
        >
          <span className={styles.ticketRaffleNumber}>Raffle #: </span>
          <span className={styles.ticketRefNumber}>{ticket.ref}</span>
        </p>
      ))}
    </div>
  );
};

const styles = {
  orderId: clsx('font-size-2xl', 'font-bold', 'mb-4'),
  orderSummary: clsx(
    'w-[4.25in]',
    'min-h-[5.5in]',
    'p-8',
    'box-border',
    'print:break-inside-avoid'
  ),
  ticketRef: clsx('font-size-2xl', 'mb-4'),
  title: clsx('font-size-2xl', 'font-bold', 'mb-4'),
  ticketRaffleNumber: clsx(),
  ticketRefNumber: clsx(),
};

export default OrderSummary;
