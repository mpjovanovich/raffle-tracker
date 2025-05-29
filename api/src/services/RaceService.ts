import { BaseService } from './BaseService.js';
import { RaceRepository } from '../repository/RaceRepository.js';

export class RaceService extends BaseService<RaceRepository> {
  constructor(repo: RaceRepository) {
    super(repo);
  }
}
