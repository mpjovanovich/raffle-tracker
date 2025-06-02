import { BaseService } from './BaseService.js';
import {
  Event as EventDTO,
  Race as RaceDTO,
} from '@horse-race-raffle-tracker/dto';
import { EventRepository } from '@/repository/EventRepository.js';
import { RaceService } from './RaceService.js';
import { HorseService } from './HorseService.js';

/*
 * This class uses the aggregate pattern to manage the hierarchy of the event,
 * and the races and horses associated with it. It is the point of entry for
 * anything related to the event data.
 */

export class EventService extends BaseService<EventRepository> {
  constructor(
    private eventRepository: EventRepository,
    private raceService: RaceService,
    private horseService: HorseService
  ) {
    super(eventRepository);
  }

  public async addRace(
    eventId: number,
    raceNumber: number,
    numberOfHorses: number
  ): Promise<EventDTO | null> {
    const event = await this.eventRepository.getById(eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    const race = await this.raceService.insert({
      id: 0,
      eventId: eventId,
      raceNumber: raceNumber,
      closed: 0,
    });

    for (let i = 1; i < numberOfHorses + 1; i++) {
      await this.horseService.insert({
        id: 0,
        raceId: race.id,
        number: i,
        winner: 0,
        scratch: 0,
      });
    }

    return this.getWithChildren(eventId);
  }

  async deleteRace(id: number): Promise<void> {
    return this.raceService.delete(id);
  }

  async getRaceById(id: number): Promise<RaceDTO | null> {
    return this.raceService.getById(id);
  }

  async getRaceWithChildren(id: number): Promise<RaceDTO | null> {
    return this.raceService.getWithChildren(id);
  }

  async getWithChildren(id: number): Promise<EventDTO | null> {
    return this.repo.getWithChildren(id);
  }
}
