import { Race } from './Race.js';

export interface Event {
  id: number;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  closed: number; // 0 or 1
  races?: Race[];
}
