import { BaseService } from './BaseService.js';
import { Event as EventDTO } from '@horse-race-raffle-tracker/dto';
import { EventRepository } from '../repository/EventRepository.js';
// import { HorseRepository } from '@/repository/HorseRepository.js';
// import { RaceRepository } from '@/repository/RaceRepository.js';

/*
 * This class uses the aggregate pattern to manage the hierarchy of the event,
 * and the races and horses associated with it. It is the point of entry for
 * anything related to the event data.
 */

export class EventService extends BaseService<EventRepository> {
  // private raceRepository: RaceRepository;
  // private horseRepository: HorseRepository;
  constructor(
    eventRepo: EventRepository
    // raceRepo: RaceRepository,
    // horseRepo: HorseRepository
  ) {
    super(eventRepo);
    // this.raceRepository = raceRepo;
    // this.horseRepository = horseRepo;
  }

  async getWithChildren(id: number): Promise<EventDTO | null> {
    return null;
  }
}
