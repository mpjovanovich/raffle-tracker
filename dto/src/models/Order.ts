import { OrderStatus } from './OrderStatus.js';
import { Ticket } from './Ticket.js';

export interface Order {
  id: number;
  createdDttm: string;
  status: OrderStatus;
  tickets?: Ticket[];
}
