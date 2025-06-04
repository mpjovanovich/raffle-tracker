import { RaceRepository } from '@/repository/RaceRepository.js';
import {
  CreateRaceRequest,
  Horse as HorseDTO,
  Race as RaceDTO,
} from '@horse-race-raffle-tracker/dto';
import { BaseService } from './BaseService.js';
import { HorseService } from './HorseService.js';

export class RaceService extends BaseService<RaceRepository> {
  constructor(
    private raceRepository: RaceRepository,
    private horseService: HorseService
  ) {
    super(raceRepository);
  }

  public async createRace(
    createRaceRequest: CreateRaceRequest
  ): Promise<RaceDTO | null> {
    // Create new race with defaults
    const race = await this.repo.insert({
      id: 0,
      eventId: createRaceRequest.eventId,
      number: createRaceRequest.raceNumber,
      closed: 0,
    });

    // Create new horses with defaults
    const horses: HorseDTO[] = [];
    for (let i = 1; i < createRaceRequest.numberOfHorses + 1; i++) {
      horses.push({
        id: 0,
        raceId: race.id,
        number: i,
        winner: 0,
        scratch: 0,
      });
    }

    await this.horseService.insertMany(horses);

    return this.getWithChildren(race.id);
  }

  public async delete(id: number): Promise<void> {
    await this.raceRepository.delete(id);
  }

  async getWithChildren(id: number): Promise<RaceDTO | null> {
    return this.repo.getWithChildren(id);
  }
}
