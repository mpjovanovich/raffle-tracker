import { BaseService } from './BaseService.js';
import {
  Event as EventDTO,
  Race as RaceDTO,
} from '@horse-race-raffle-tracker/dto';
import { EventRepository } from '../repository/EventRepository.js';

/*
 * This class uses the aggregate pattern to manage the hierarchy of the event,
 * and the races and horses associated with it. It is the point of entry for
 * anything related to the event data.
 */

export class EventService extends BaseService<EventRepository> {
  constructor(repo: EventRepository) {
    super(repo);
  }

  async addRace(
    eventId: number,
    raceNumber: number,
    numberOfHorses: number
  ): Promise<EventDTO | null> {
    return this.repo.addRace(eventId, raceNumber, numberOfHorses);
  }

  async deleteRace(id: number): Promise<void> {
    return this.repo.deleteRace(id);
  }

  async getRaceById(id: number): Promise<RaceDTO | null> {
    return this.repo.getRaceById(id);
  }

  async getRaceWithChildren(id: number): Promise<RaceDTO | null> {
    return this.repo.getRaceWithChildren(id);
  }

  async getWithChildren(id: number): Promise<EventDTO | null> {
    return this.repo.getWithChildren(id);
  }
}
