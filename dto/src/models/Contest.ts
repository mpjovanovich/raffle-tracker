import { Horse } from './Horse.js';

export interface Contest {
  id: number;
  eventId: number;
  number: number;
  closed: boolean;
  horses?: Horse[];
}
