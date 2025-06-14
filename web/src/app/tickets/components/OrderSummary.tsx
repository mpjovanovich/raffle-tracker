import { CreateTicketsResponse } from '@raffle-tracker/dto';

interface OrderSummaryProps {
  eventName: string;
  tickets: CreateTicketsResponse[];
}
const OrderSummary = ({ eventName, tickets }: OrderSummaryProps) => {
  const orderId = tickets[0]?.orderId;
  return (
    <div className="order-summary">
      <h1 className="title">{eventName}</h1>
      <h1 className="order-id">Order ID: {orderId}</h1>
      {tickets.map(ticket => (
        <p
          key={ticket.ref}
          className="ticket-ref"
        >
          <span className="ticket-raffle-number">Raffle #: </span>
          <span className="ticket-ref-number">{ticket.ref}</span>
        </p>
      ))}
    </div>
  );
};

export default OrderSummary;
