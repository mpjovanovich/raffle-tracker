import { Horse, PrismaClient } from '.prisma/client';
import { Horse as HorseDTO } from '@raffle-tracker/dto';
import { BaseRepository } from './BaseRepository.js';

export class HorseRepository extends BaseRepository<Horse, HorseDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'horse');
  }

  public static toDTO(horse: Horse): HorseDTO {
    return {
      id: horse.id,
      contestId: horse.contest_id,
      number: horse.number,
      winner: horse.winner ? 1 : 0,
      scratch: horse.scratch ? 1 : 0,
    };
  }

  protected static toPrisma(horse: HorseDTO): Horse {
    return {
      id: horse.id,
      contest_id: horse.contestId,
      number: horse.number,
      winner: horse.winner === 1,
      scratch: horse.scratch === 1,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.horse.delete({ where: { id } });
  }

  public async setWinner(horse: HorseDTO): Promise<HorseDTO> {
    return this.prisma.$transaction(async tx => {
      // Clear all winners in the contest
      await tx.horse.updateMany({
        where: { contest_id: horse.contestId },
        data: { winner: false },
      });

      // Set this horse as winner
      const updatedHorse = await tx.horse.update({
        where: { id: horse.id },
        data: { winner: !horse.winner },
      });

      return this.toDTO(updatedHorse);
    });
  }
}
