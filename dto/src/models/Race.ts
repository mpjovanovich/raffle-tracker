import { Horse } from './Horse.js';

export interface Race {
  id: number;
  eventId: number;
  raceNumber: number;
  closed: number; // 0 or 1
  horses?: Horse[];
}
