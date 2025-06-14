import { Ticket } from './Ticket.js';

export interface Order {
  id: number;
  createdDttm: string;
  tickets?: Ticket[];
}
