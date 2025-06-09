// import TicketPrintout from '@/app/tickets/components/TicketPrintout';
import { CreateTicketsResponse } from '@raffle-tracker/dto';
import { renderToString } from 'react-dom/server';

interface OrderSummaryProps {
  eventName: string;
  tickets: CreateTicketsResponse[];
}

export const printTickets = ({ eventName, tickets }: OrderSummaryProps) => {
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

  const ticketHTML = renderToString(
    <OrderSummary
      eventName={eventName}
      tickets={tickets}
    />
  );

  const styles = `
  .ticket-container {
    width: 100%;
  }

  .ticket-ref {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  @media print {
    @page {
      margin: 0;
      size: auto;
    }

    .ticket-container {
      width: 8.5in;
      height: 11in;
      display: flex;
      flex-direction: column;
    }

    .order-summary {
      width: 8.5in;
      min-height: 5.5in;
      height: auto;
      padding: 0.5in;
      box-sizing: border-box;
      page-break-inside: avoid;
    }
  }

  .perforation-line {
    height: 1px;
    background: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 5px,
      transparent 5px,
      transparent 10px
    );
    margin: 0;
    padding: 0;
  }
  `;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            ${styles}
        </style>
    </head>
    <body>
        <div class="ticket-container">
            ${ticketHTML}
            ${ticketHTML}
        </div>
    </body>
    </html>
    `;

  const printWindow = window.open('', '_blank');
  printWindow?.document.write(html);
  printWindow?.document.close();
  printWindow?.print();
  // printWindow?.close();
};
