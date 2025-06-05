import { HorseRepository } from '@/repository/HorseRepository.js';
import {
  CreateHorseRequest,
  Horse as HorseDTO,
} from '@horse-race-raffle-tracker/dto';
import { BaseService } from './BaseService.js';

export class HorseService extends BaseService<HorseRepository> {
  constructor(private horseRepository: HorseRepository) {
    super(horseRepository);
  }

  public async createHorse(
    createHorseRequest: CreateHorseRequest
  ): Promise<HorseDTO> {
    const horse = await this.horseRepository.insert({
      id: 0,
      raceId: createHorseRequest.raceId,
      number: createHorseRequest.number,
      winner: 0,
      scratch: 0,
    });
    return horse;
  }

  public async delete(id: number): Promise<void> {
    await this.horseRepository.delete(id);
  }

  public async toggleScratch(id: number): Promise<HorseDTO> {
    let horse = await this.horseRepository.getById(id);
    if (!horse) {
      throw new Error('Horse not found');
    }
    horse.scratch = horse.scratch === 0 ? 1 : 0;
    horse = await this.horseRepository.update(id, horse);
    return horse;
  }

  public async toggleWinner(id: number): Promise<HorseDTO> {
    let horse = await this.horseRepository.getById(id);
    if (!horse) {
      throw new Error('Horse not found');
    }
    if (horse.scratch === 1) {
      throw new Error('Scratched horse cannot be winner');
    }
    await this.horseRepository.clearWinner(horse.raceId);
    horse.winner = horse.winner === 0 ? 1 : 0;
    horse = await this.horseRepository.update(id, horse);
    return this.horseRepository.getById(id);
  }
}
