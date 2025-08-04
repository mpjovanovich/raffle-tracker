// api/src/services/ContestService.ts
import { Contest, PrismaClient } from '.prisma/client';
import {
  Contest as ContestDTO,
  CreateContestRequest,
} from '@raffle-tracker/dto';
import { BaseService } from './BaseService.js';
import { HorseService } from './HorseService.js';

export class ContestService extends BaseService<Contest, ContestDTO> {
  constructor(
    prisma: PrismaClient,
    private horseService: HorseService
  ) {
    super(prisma, 'contest');
  }

  public static toDTO(contest: Contest): ContestDTO {
    return {
      id: contest.id,
      eventId: contest.event_id,
      number: contest.number,
      closed: contest.closed,
    };
  }

  protected static toPrisma(contest: ContestDTO): Contest {
    return {
      id: contest.id,
      event_id: contest.eventId,
      number: contest.number,
      closed: contest.closed,
    };
  }

  public async createContest(
    createContestRequest: CreateContestRequest
  ): Promise<ContestDTO | null> {
    // Create new contest with defaults
    const contest = {
      id: 0,
      eventId: createContestRequest.eventId,
      number: createContestRequest.contestNumber,
      closed: false,
    };

    return this.prisma.$transaction(async tx => {
      const { id, ...contestData } = this.toPrisma(contest);
      const newContest = await tx.contest.create({
        data: contestData,
      });

      const horses = [];
      for (let i = 1; i <= createContestRequest.numberOfHorses; i++) {
        horses.push({
          contest_id: newContest.id,
          number: i,
          winner: false,
          scratch: false,
        });
      }
      await tx.horse.createMany({
        data: horses,
      });

      return this.getWithChildren(newContest.id);
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.contest.delete({ where: { id } });
  }

  async getWithChildren(id: number): Promise<ContestDTO | null> {
    const contestWithHorses = await this.prisma.contest.findUnique({
      where: { id },
      include: { horse: true },
    });

    if (!contestWithHorses) {
      return null;
    }

    return {
      ...this.toDTO(contestWithHorses),
      horses: contestWithHorses.horse?.map(horse => ({
        ...(HorseService.toDTO(horse) ?? []),
      })),
    };
  }
}
