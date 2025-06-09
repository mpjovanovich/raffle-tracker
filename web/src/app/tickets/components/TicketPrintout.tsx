import { CreateTicketsResponse } from '@raffle-tracker/dto';

interface TicketPrintoutProps {
  tickets: CreateTicketsResponse[];
}

const TicketPrintout = ({ tickets }: TicketPrintoutProps) => {
  return (
    <div>
      {tickets.map(ticket => (
        <p key={ticket.ref}>{ticket.ref}</p>
      ))}
    </div>
  );
};

export default TicketPrintout;
