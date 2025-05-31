import { BaseRepository } from './BaseRepository.js';
import { Race as RaceDTO } from '@horse-race-raffle-tracker/dto';
import { PrismaClient, Race } from '.prisma/client';

export class RaceRepository extends BaseRepository<Race, RaceDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'race');
  }

  public toDTO(race: Race): RaceDTO {
    return {
      id: race.id,
      eventId: race.event_id,
      raceNumber: race.race_number,
      closed: race.closed === 1,
    };
  }

  protected toPrisma(race: RaceDTO): Race {
    return {
      id: race.id,
      event_id: race.eventId,
      race_number: race.raceNumber,
      closed: race.closed ? 1 : 0,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.race.delete({ where: { id } });
  }
}
