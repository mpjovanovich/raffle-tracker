import { TicketStatus } from './TicketStatus.js';

export interface Ticket {
  id: number;
  eventId: number;
  contestId: number;
  horseId: number;
  createdDttm: string;
  redeemedDttm: string | null;
  refundedDttm: string | null;
  status: TicketStatus;
}
