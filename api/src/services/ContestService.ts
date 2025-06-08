import { ContestRepository } from '@/repository/ContestRepository.js';
import {
  Contest as ContestDTO,
  CreateContestRequest,
} from '@raffle-tracker/dto';
import { BaseService } from './BaseService.js';
import { HorseService } from './HorseService.js';

export class ContestService extends BaseService<ContestRepository> {
  constructor(
    private contestRepository: ContestRepository,
    private horseService: HorseService
  ) {
    super(contestRepository);
  }

  public async createContest(
    createContestRequest: CreateContestRequest
  ): Promise<ContestDTO | null> {
    // Create new contest with defaults
    const contest = {
      id: 0,
      eventId: createContestRequest.eventId,
      number: createContestRequest.contestNumber,
      closed: 0,
    };

    await this.repo.createContest(contest, createContestRequest.numberOfHorses);
    return this.getWithChildren(contest.id);
  }

  public async delete(id: number): Promise<void> {
    await this.contestRepository.delete(id);
  }

  async getWithChildren(id: number): Promise<ContestDTO | null> {
    return this.repo.getWithChildren(id);
  }
}
