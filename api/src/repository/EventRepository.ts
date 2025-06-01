import { BaseRepository } from './BaseRepository.js';
import { Event as EventDTO } from '@horse-race-raffle-tracker/dto';
import { PrismaClient, Event } from '.prisma/client';
import { HorseRepository } from './HorseRepository.js';
import { RaceRepository } from './RaceRepository.js';

export class EventRepository extends BaseRepository<Event, EventDTO> {
  private raceRepository: RaceRepository;
  private horseRepository: HorseRepository;

  constructor(prisma: PrismaClient) {
    super(prisma, 'event');
    this.raceRepository = new RaceRepository(prisma);
    this.horseRepository = new HorseRepository(prisma);
  }

  public toDTO(event: Event): EventDTO {
    return {
      id: event.id,
      name: event.name,
      location: event.location,
      startDate: event.start_date.toISOString().split('T')[0],
      endDate: event.end_date.toISOString().split('T')[0],
    };
  }

  protected toPrisma(EventDTO: EventDTO): Event {
    return {
      id: EventDTO.id,
      name: EventDTO.name,
      location: EventDTO.location,
      start_date: new Date(EventDTO.startDate),
      end_date: new Date(EventDTO.endDate),
    };
  }

  public async addRaces(
    eventId: number,
    raceNumber: number,
    numberOfHorses: number
  ): Promise<EventDTO | null> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const race = await this.raceRepository.insert({
      id: 0,
      eventId: eventId,
      raceNumber: raceNumber,
      closed: false,
    });

    for (let i = 1; i < numberOfHorses + 1; i++) {
      await this.horseRepository.insert({
        id: 0,
        raceId: race.id,
        number: i,
        winner: false,
        scratch: false,
      });
    }

    return this.getWithChildren(eventId);
  }

  public async deleteRace(id: number): Promise<void> {
    await this.raceRepository.delete(id);
  }

  public async getWithChildren(id: number): Promise<EventDTO | null> {
    const eventWithRaces = await this.prisma.event.findUnique({
      where: { id },
      include: {
        race: {
          include: {
            horse: true,
          },
        },
      },
    });

    if (!eventWithRaces) {
      return null;
    }

    // Breaking down this syntax, b/c... yeah. Lots of TS:
    return {
      // Spread the properties of the Prisma event type using the "..." (spread) operator.
      // This has additional properties for races, but since TS is structurally typed it doesn't care;
      // it will ignore them in the "toDTO" call.
      ...this.toDTO(eventWithRaces),
      // Now assign the races property via map call
      races:
        // Use "optional chaining" to continue the map call if there are any races.
        // If not, the optional chaining operator will return undefined, which we
        // will catch with our nullish coalescing operator.
        eventWithRaces.race?.map(race => ({
          // Use the toDTO method from the race repository to convert the races
          // from this event to a DTO.
          ...this.raceRepository.toDTO(race),
          // Now assign the horses property, still within the outer map call.
          // Use the toDTO method from the horse repository to convert the
          // horses from this race to a DTO.
          horses:
            race.horse?.map(horse => this.horseRepository.toDTO(horse)) ?? [],
          // Finally, use the nullish coalescing operator to return an empty array
          // if there are no races. That way we don't ever have an undefined
          // value for the races property. We did the same above for the horses.
        })) ?? [],
    };
  }
}
