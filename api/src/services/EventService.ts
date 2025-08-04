// api/src/services/EventService.ts
import { Event, PrismaClient } from '.prisma/client';
import { Contest as ContestDTO, Event as EventDTO } from '@raffle-tracker/dto';
import { BaseService } from './BaseService.js';
import { ContestService } from './ContestService.js';
import { HorseService } from './HorseService.js';

export class EventService extends BaseService<Event, EventDTO> {
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
      ticketPrice: event.ticket_price,
      closed: event.closed,
    };
  }

  protected static toPrisma(event: EventDTO): Event {
    return {
      id: event.id,
      name: event.name,
      location: event.location,
      start_date: new Date(event.startDate),
      end_date: new Date(event.endDate),
      ticket_price: event.ticketPrice,
      closed: event.closed,
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

    return {
      ...this.toDTO(eventWithContests),
      contests:
        eventWithContests.contest?.map(contest => ({
          ...ContestService.toDTO(contest),
          horses: contest.horse?.map(horse => HorseService.toDTO(horse)) ?? [],
        })) ?? [],
    };
  }

  public getEventValidContests(event: EventDTO): ContestDTO[] {
    // Must not be closed and must have at least one horse that is not scratched
    const contests =
      event.contests?.filter(
        contest =>
          !contest.closed &&
          contest.horses &&
          contest.horses.some(h => !h.scratch)
      ) ?? [];

    // Currently no use cases require horses, so we can just return the contests.
    // The ticket page consumes these results.
    contests.forEach(contest => {
      contest.horses = [];
    });

    return contests;
  }

  public async update(id: number, event: EventDTO): Promise<EventDTO> {
    // Don't allow updating a closed event
    const existingEvent = await this.getById(id);
    if (existingEvent.closed) {
      throw new Error('Cannot update closed event');
    }

    // Don't allow updating an event that has tickets
    const ticketCount = await this.prisma.ticket.count({
      where: { event_id: id },
    });
    if (ticketCount > 0) {
      throw new Error('Cannot update event that has tickets');
    }

    const updatedEvent = await super.update(id, event);
    return updatedEvent;
  }
}
