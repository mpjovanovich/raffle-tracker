import { Contest } from './Contest.js';

export interface Event {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  ticketPrice: number;
  closed: boolean;
  contests?: Contest[];
}
