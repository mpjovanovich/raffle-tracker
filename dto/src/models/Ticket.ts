import { TicketStatus } from './TicketStatus.js';

export interface Ticket {
  id: number;
  eventId: number;
  raceId: number;
  horseId: number;
  createdDttm: Date;
  redeemedDttm: Date;
  refundedDttm: Date;
  status: TicketStatus;
}
