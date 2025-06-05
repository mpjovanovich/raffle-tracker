import { Contest, PrismaClient } from '.prisma/client';
import { Contest as ContestDTO } from '@raffle-tracker/dto';
import { BaseRepository } from './BaseRepository.js';
import { HorseRepository } from './HorseRepository.js';

export class ContestRepository extends BaseRepository<Contest, ContestDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'contest');
  }

  public static toDTO(contest: Contest): ContestDTO {
    return {
      id: contest.id,
      eventId: contest.event_id,
      number: contest.number,
      closed: contest.closed ? 1 : 0,
    };
  }

  protected static toPrisma(contest: ContestDTO): Contest {
    return {
      id: contest.id,
      event_id: contest.eventId,
      number: contest.number,
      closed: contest.closed === 1,
    };
  }

  public async createContest(
    contest: ContestDTO,
    numberOfHorses: number
  ): Promise<void> {
    let { id, ...contestData } = this.toPrisma(contest);
    return this.prisma.$transaction(async tx => {
      const newContest = await tx.contest.create({
        data: contestData,
      });

      const horses = [];
      for (let i = 1; i <= numberOfHorses; i++) {
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
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.contest.delete({ where: { id } });
  }

  public async getWithChildren(id: number): Promise<ContestDTO | null> {
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
        ...(HorseRepository.toDTO(horse) ?? []),
      })),
    };
  }
}
