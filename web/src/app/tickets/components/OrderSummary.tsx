import { CreateTicketsResponse } from '@raffle-tracker/dto';

interface OrderSummaryProps {
  eventName: string;
  tickets: CreateTicketsResponse[];
}
const OrderSummary = ({ eventName, tickets }: OrderSummaryProps) => {
  return (
    <div className="order-summary">
      <h1 className="title">{eventName}</h1>
      {tickets.map(ticket => (
        <p
          key={ticket.ref}
          className="ticket-ref"
        >
          {ticket.ref}
        </p>
      ))}
    </div>
  );
};

export default OrderSummary;
