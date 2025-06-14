import { TicketStatus } from './TicketStatus.js';

export interface Ticket {
  id: number;
  eventId: number;
  contestId: number;
  horseId: number;
  orderId: number;
  status: TicketStatus;
}
