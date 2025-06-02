import { BaseRepository } from './BaseRepository.js';
import { Race as RaceDTO } from '@horse-race-raffle-tracker/dto';
import { PrismaClient, Race } from '.prisma/client';
import { HorseRepository } from './HorseRepository.js';

export class RaceRepository extends BaseRepository<Race, RaceDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'race');
  }

  public static toDTO(race: Race): RaceDTO {
    return {
      id: race.id,
      eventId: race.event_id,
      raceNumber: race.race_number,
      closed: race.closed ? 1 : 0,
    };
  }

  protected static toPrisma(race: RaceDTO): Race {
    return {
      id: race.id,
      event_id: race.eventId,
      race_number: race.raceNumber,
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

  // public async insert(
  //   eventId: number,
  //   raceNumber: number,
  //   numberOfHorses: number
  // ): Promise<EventDTO | null> {
  //   const event = await this.prisma.event.findUnique({
  //     where: { id: eventId },
  //   });

  //   if (!event) {
  //     throw new Error('Event not found');
  //   }

  //   const race = await this.raceRepository.insert({
  //     id: 0,
  //     eventId: eventId,
  //     raceNumber: raceNumber,
  //     closed: 0,
  //   });

  //   for (let i = 1; i < numberOfHorses + 1; i++) {
  //     await this.horseRepository.insert({
  //       id: 0,
  //       raceId: race.id,
  //       number: i,
  //       winner: 0,
  //       scratch: 0,
  //     });
  //   }

  //   return this.getWithChildren(eventId);
  // }
}
