import { Contest } from './Contest.js';

export interface Event {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  ticketPrice: number;
  closed: number; // 0 or 1
  contests?: Contest[];
}
