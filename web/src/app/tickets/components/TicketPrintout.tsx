// import { CreateTicketsResponse } from '@raffle-tracker/dto';

// interface TicketPrintoutProps {
//   eventName: string;
//   tickets: CreateTicketsResponse[];
// }

// const OrderSummary = ({ eventName, tickets }: TicketPrintoutProps) => {
//   return (
//     <div className="order-summary">
//       <h1 className="title">{eventName}</h1>
//       {tickets.map(ticket => (
//         <p
//           key={ticket.ref}
//           className="ticket-ref"
//         >
//           {ticket.ref}
//         </p>
//       ))}
//     </div>
//   );
// };

// const TicketPrintout = ({ eventName, tickets }: TicketPrintoutProps) => {
//   return (
//     <div className="ticket-container">
//       <OrderSummary
//         eventName={eventName}
//         tickets={tickets}
//       />
//       <OrderSummary
//         eventName={eventName}
//         tickets={tickets}
//       />
//     </div>
//   );
// };

// const styles = `
//   .ticket-container {
//     width: 100%;
//     border: 10px solid red;
//   }

//   @media print {
//     .ticket-container {
//       width: 8.5in;
//       height: 11in;
//       display: flex;
//       flex-direction: column;
//     }

//     .order-summary {
//       width: 8.5in;
//       height: 5.5in;
//       page-break-after: always;
//       padding: 0.5in;
//       box-sizing: border-box;
//     }
//   }

//   .title {
//     font-size: 1.5rem;
//     font-weight: bold;
//     margin-bottom: 1rem;
//   }

//   .ticket-ref {
//     font-size: 1.125rem;
//     margin-bottom: 0.5rem;
//   }
// `;

// // Add the styles to the document
// const styleSheet = document.createElement('style');
// styleSheet.textContent = styles;
// document.head.appendChild(styleSheet);

// export default TicketPrintout;
