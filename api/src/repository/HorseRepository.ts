import { BaseRepository } from './BaseRepository.js';
import { Horse as HorseDTO } from '@horse-race-raffle-tracker/dto';
import { PrismaClient, Horse } from '.prisma/client';

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

  public async delete(id: number): Promise<void> {
    await this.prisma.horse.delete({ where: { id } });
  }
}
