import { Contest, Horse, PrismaClient, Ticket } from '.prisma/client';
import EphemeralLock from '@/utility/EphemeralLock.js';
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
      createdDttm: ticket.created_dttm.toISOString(),
      redeemedDttm: ticket.redeemed_dttm
        ? ticket.redeemed_dttm.toISOString()
        : null,
      refundedDttm: ticket.refunded_dttm
        ? ticket.refunded_dttm.toISOString()
        : null,
      status: ticket.status as TicketStatus,
    };
  }

  protected static toPrisma(ticket: TicketDTO): Ticket {
    return {
      id: ticket.id,
      event_id: ticket.eventId,
      contest_id: ticket.contestId,
      horse_id: ticket.horseId,
      created_dttm: new Date(ticket.createdDttm),
      redeemed_dttm: ticket.redeemedDttm ? new Date(ticket.redeemedDttm) : null,
      refunded_dttm: ticket.refundedDttm ? new Date(ticket.refundedDttm) : null,
      status: ticket.status as TicketStatus,
    };
  }

  private formatTicketResponse(
    contest: Contest,
    horse: Horse,
    ticket: Ticket
  ): CreateTicketsResponse {
    return {
      date: ticket.created_dttm.toISOString().split('T')[0],
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
    // Everything here needs to be atomic.
    return this.prisma.$transaction(async tx => {
      const createdTickets: CreateTicketsResponse[] = [];
      const now = new Date();

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
          for (let i = 0; i < request.numberOfTickets; i++) {
            const horse = this.getNextHorse(ticketCount++, activeHorses);
            const ticket = await tx.ticket.create({
              data: {
                event_id: contest.event_id,
                contest_id: request.contestId,
                horse_id: horse.id,
                created_dttm: now,
                status: 'CREATED',
              },
            });

            // Add to response
            createdTickets.push(
              this.formatTicketResponse(contest, horse, ticket)
            );
          }
        });
      }

      return createdTickets;
    });
  }
}
