import { Event, PrismaClient } from '.prisma/client';
import { Event as EventDTO } from '@raffle-tracker/dto';
import { BaseRepository } from './BaseRepository.js';
import { ContestRepository } from './ContestRepository.js';
import { HorseRepository } from './HorseRepository.js';

export class EventRepository extends BaseRepository<Event, EventDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'event');
  }

  public static toDTO(event: Event): EventDTO {
    return {
      id: event.id,
      name: event.name,
      location: event.location,
      startDate: event.start_date.toISOString().split('T')[0],
      endDate: event.end_date.toISOString().split('T')[0],
      closed: event.closed ? 1 : 0,
    };
  }

  protected static toPrisma(event: EventDTO): Event {
    return {
      id: event.id,
      name: event.name,
      location: event.location,
      start_date: new Date(event.startDate),
      end_date: new Date(event.endDate),
      closed: event.closed === 1,
    };
  }

  public async getWithChildren(id: number): Promise<EventDTO | null> {
    const eventWithContests = await this.prisma.event.findUnique({
      where: { id },
      include: {
        contest: {
          include: {
            horse: true,
          },
        },
      },
    });

    if (!eventWithContests) {
      return null;
    }

    // Breaking down this syntax, b/c... yeah. Lots of TS:
    return {
      // Spread the properties of the Prisma event type using the "..." (spread) operator.
      // This has additional properties for contests, but since TS is structurally typed it doesn't care;
      // it will ignore them in the "toDTO" call.
      ...this.toDTO(eventWithContests),
      // Now assign the contests property via map call
      contests:
        // Use "optional chaining" to continue the map call if there are any contests.
        // If not, the optional chaining operator will return undefined, which we
        // will catch with our nullish coalescing operator.
        eventWithContests.contest?.map(contest => ({
          // Use the toDTO method from the contest repository to convert the contests
          // from this event to a DTO.
          // ...this.contestRepository.toDTO(contest),
          ...ContestRepository.toDTO(contest),
          // Now assign the horses property, still within the outer map call.
          // Use the toDTO method from the horse repository to convert the
          // horses from this contest to a DTO.gg
          horses:
            contest.horse?.map(horse => HorseRepository.toDTO(horse)) ?? [],
          // Finally, use the nullish coalescing operator to return an empty array
          // if there are no contests. That way we don't ever have an undefined
          // value for the contests property. We did the same above for the horses.
        })) ?? [],
    };
  }
}
