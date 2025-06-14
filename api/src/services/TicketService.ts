import { Contest, Horse, PrismaClient, Ticket } from '.prisma/client';
import EphemeralLock from '@/utils/EphemeralLock.js';
import {
  CreateTicketsRequest,
  CreateTicketsResponse,
  Ticket as TicketDTO,
  TicketStatus,
} from '@raffle-tracker/dto';
import { BaseService } from './BaseService.js';

export class TicketService extends BaseService<Ticket, TicketDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'ticket');
  }

  public static toDTO(ticket: Ticket): TicketDTO {
    return {
      id: ticket.id,
      eventId: ticket.event_id,
      contestId: ticket.contest_id,
      horseId: ticket.horse_id,
      orderId: ticket.order_id,
      status: ticket.status as TicketStatus,
    };
  }

  protected static toPrisma(ticket: TicketDTO): Ticket {
    return {
      id: ticket.id,
      event_id: ticket.eventId,
      contest_id: ticket.contestId,
      horse_id: ticket.horseId,
      order_id: ticket.orderId,
      status: ticket.status as TicketStatus,
    };
  }

  private formatTicketResponse(
    createdDttm: Date,
    orderId: number,
    contest: Contest,
    horse: Horse,
    ticket: Ticket
  ): CreateTicketsResponse {
    return {
      date: createdDttm.toISOString().split('T')[0],
      orderId: orderId.toString().padStart(5, '0'),
      contest: contest.number.toString().padStart(2, '0'),
      horse: horse.number.toString().padStart(2, '0'),
      ref: ticket.id.toString().padStart(5, '0'),
    };
  }

  private getNextHorse(ticketCount: number, activeHorses: Horse[]): Horse {
    return activeHorses[ticketCount % activeHorses.length];
  }

  public async createTickets(
    requests: CreateTicketsRequest[]
  ): Promise<CreateTicketsResponse[]> {
    if (requests.length === 0) {
      return [];
    }

    // Everything here needs to be atomic.
    return this.prisma.$transaction(async tx => {
      const createdTickets: CreateTicketsResponse[] = [];
      const now = new Date();

      // Create new order
      const order = await tx.order.create({
        data: {
          created_dttm: now,
        },
      });

      for (const request of requests) {
        const contest = await tx.contest.findUnique({
          where: { id: request.contestId },
        });
        if (!contest) {
          throw new Error('Contest not found');
        }

        // We have to lock to make sure the round robin horse assignment is
        // consistent. Otherwise we could hit a race condition.
        await EphemeralLock.withLock('createTicketsForContest', async () => {
          // Get current ticket count for this contest
          let ticketCount = await tx.ticket.count({
            where: { contest_id: request.contestId },
          });

          // Get number of active horses (not scratched)
          const activeHorses = await tx.horse.findMany({
            where: { contest_id: request.contestId, scratch: false },
          });
          if (activeHorses.length === 0) {
            throw new Error('No active horses available for ticket assignment');
          }

          // Create tickets for this contest
          for (let i = 0; i < request.quantity; i++) {
            const horse = this.getNextHorse(ticketCount++, activeHorses);
            const ticket = await tx.ticket.create({
              data: {
                event_id: contest.event_id,
                contest_id: request.contestId,
                horse_id: horse.id,
                order_id: order.id,
                status: 'CREATED',
              },
            });

            // Add to response
            createdTickets.push(
              this.formatTicketResponse(now, order.id, contest, horse, ticket)
            );
          }
        });
      }

      return createdTickets;
    });
  }
}
