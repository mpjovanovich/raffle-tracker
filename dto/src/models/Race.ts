import { Horse } from './Horse.js';

export interface Race {
  id: number;
  eventId: number;
  raceNumber: number;
  closed: boolean;
  horses?: Horse[];
}
