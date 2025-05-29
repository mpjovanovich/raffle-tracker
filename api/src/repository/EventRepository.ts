import { BaseRepository } from './BaseRepository.js';
import { Event as EventDTO } from '@horse-race-raffle-tracker/dto';
import { PrismaClient, Event } from '.prisma/client';

export class EventRepository extends BaseRepository<Event, EventDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'event');
  }

  protected toDTO(event: Event): EventDTO {
    return {
      id: event.id,
      name: event.name,
      location: event.location,
      startDate: new Date(event.start_date),
      endDate: new Date(event.end_date),
    };
  }

  protected toPrisma(EventDTO: EventDTO): Event {
    return {
      id: EventDTO.id,
      name: EventDTO.name,
      location: EventDTO.location,
      start_date: EventDTO.startDate.toISOString(),
      end_date: EventDTO.endDate.toISOString(),
    };
  }
}
