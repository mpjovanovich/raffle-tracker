import { Race } from './Race.js';

export interface Event {
  id: number;
  name: string;
  location: string;
  startDate: Date;
  endDate: Date;
  races?: Race[];
}
