import { TicketStatus } from './TicketStatus.js';

export interface Ticket {
  id: number;
  eventId: number;
  raceId: number;
  horseId: number;
  createdDttm: string;
  redeemedDttm: string | null;
  refundedDttm: string | null;
  status: TicketStatus;
}
