import { Horse } from './Horse.js';

export interface Race {
  id: number;
  eventId: number;
  number: number;
  closed: number; // 0 or 1
  horses?: Horse[];
}
