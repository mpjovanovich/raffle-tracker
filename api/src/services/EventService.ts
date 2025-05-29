import { BaseService } from './BaseService.js';
import { Event as EventDTO } from '@horse-race-raffle-tracker/dto';
import { EventRepository } from '../repository/EventRepository.js';

/*
 * This class uses the aggregate pattern to manage the hierarchy of the event,
 * and the races and horses associated with it. It is the point of entry for
 * anything related to the event data.
 */

export class EventService extends BaseService<EventRepository> {
  constructor(eventRepo: EventRepository) {
    super(eventRepo);
  }

  async getWithChildren(id: number): Promise<EventDTO | null> {
    return null;
  }
}
