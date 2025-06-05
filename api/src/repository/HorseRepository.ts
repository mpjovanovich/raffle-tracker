import { Horse, PrismaClient } from '.prisma/client';
import { Horse as HorseDTO } from '@horse-race-raffle-tracker/dto';
import { BaseRepository } from './BaseRepository.js';

export class HorseRepository extends BaseRepository<Horse, HorseDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'horse');
  }

  public static toDTO(horse: Horse): HorseDTO {
    return {
      id: horse.id,
      raceId: horse.race_id,
      number: horse.number,
      winner: horse.winner ? 1 : 0,
      scratch: horse.scratch ? 1 : 0,
    };
  }

  protected static toPrisma(horse: HorseDTO): Horse {
    return {
      id: horse.id,
      race_id: horse.raceId,
      number: horse.number,
      winner: horse.winner === 1,
      scratch: horse.scratch === 1,
    };
  }

  public async clearWinner(raceId: number): Promise<void> {
    await this.prisma.horse.updateMany({
      where: { race_id: raceId },
      data: { winner: false },
    });
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.horse.delete({ where: { id } });
  }
}
