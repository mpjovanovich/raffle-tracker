import TicketPrintout from '@/app/tickets/components/TicketPrintout';
import { CreateTicketsResponse } from '@raffle-tracker/dto';
import { renderToString } from 'react-dom/server';

export const printTickets = (tickets: CreateTicketsResponse[]) => {
  const ticketHTML = renderToString(<TicketPrintout tickets={tickets} />);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        ${ticketHTML}
    </body>
    </html>
    `;

  const printWindow = window.open('', '_blank');
  printWindow?.document.write(html);
  printWindow?.document.close();
  printWindow?.print();
  printWindow?.close();
};
