import { BaseService } from './BaseService.js';
import { Race as RaceDTO } from '@horse-race-raffle-tracker/dto';
import { RaceRepository } from '@/repository/RaceRepository.js';

export class RaceService extends BaseService<RaceRepository> {
  constructor(private raceRepository: RaceRepository) {
    super(raceRepository);
  }

  public async delete(id: number): Promise<void> {
    await this.raceRepository.delete(id);
  }

  async getWithChildren(id: number): Promise<RaceDTO | null> {
    return this.repo.getWithChildren(id);
  }
}
