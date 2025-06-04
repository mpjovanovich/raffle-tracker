import { EventRepository } from '@/repository/EventRepository.js';
import { Event as EventDTO } from '@horse-race-raffle-tracker/dto';
import { BaseService } from './BaseService.js';

export class EventService extends BaseService<EventRepository> {
  constructor(private eventRepository: EventRepository) {
    super(eventRepository);
  }

  public async getWithChildren(id: number): Promise<EventDTO | null> {
    return this.repo.getWithChildren(id);
  }
}
