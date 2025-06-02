import { BaseService } from './BaseService.js';
import { Horse as HorseDTO } from '@horse-race-raffle-tracker/dto';
import { HorseRepository } from '@/repository/HorseRepository.js';

export class HorseService extends BaseService<HorseRepository> {
  constructor(private horseRepository: HorseRepository) {
    super(horseRepository);
  }

  public async delete(id: number): Promise<void> {
    await this.horseRepository.delete(id);
  }
}
