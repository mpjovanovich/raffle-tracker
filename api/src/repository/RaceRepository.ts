import { PrismaClient, Race } from '.prisma/client';
import { Race as RaceDTO } from '@horse-race-raffle-tracker/dto';
import { BaseRepository } from './BaseRepository.js';
import { HorseRepository } from './HorseRepository.js';

export class RaceRepository extends BaseRepository<Race, RaceDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'race');
  }

  public static toDTO(race: Race): RaceDTO {
    return {
      id: race.id,
      eventId: race.event_id,
      number: race.number,
      closed: race.closed ? 1 : 0,
    };
  }

  protected static toPrisma(race: RaceDTO): Race {
    return {
      id: race.id,
      event_id: race.eventId,
      number: race.number,
      closed: race.closed === 1,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.race.delete({ where: { id } });
  }

  public async getWithChildren(id: number): Promise<RaceDTO | null> {
    const raceWithHorses = await this.prisma.race.findUnique({
      where: { id },
      include: { horse: true },
    });

    if (!raceWithHorses) {
      return null;
    }

    return {
      ...this.toDTO(raceWithHorses),
      horses: raceWithHorses.horse?.map(horse => ({
        ...(HorseRepository.toDTO(horse) ?? []),
      })),
    };
  }
}
