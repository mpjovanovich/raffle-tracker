import OrderSummary from '@/app/tickets/components/OrderSummary';
import { CreateTicketsResponse } from '@raffle-tracker/dto';
import { renderToString } from 'react-dom/server';

export const printTickets = (
  eventName: string,
  tickets: CreateTicketsResponse[]
) => {
  const DEV_MODE = true;

  const ticketHTML = renderToString(
    <OrderSummary
      eventName={eventName}
      tickets={tickets}
    />
  );

  // We can't use tailwind here because this is being generated on the client.
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
  border-bottom: 1px dashed #000;
  margin: 0;
  padding: 0;
  width: 100%;
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
            ${DEV_MODE ? '<div class="perforation-line"></div>' : ''}
            ${ticketHTML}
        </div>
    </body>
    </html>
    `;

  const printWindow = window.open('', '_blank');
  printWindow?.document.write(html);
  printWindow?.document.close();
  printWindow?.print();
  printWindow?.close();
};
