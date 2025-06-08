import { PrismaClient, Ticket } from '.prisma/client';
import {
  CreateTicketsRequest,
  Ticket as TicketDTO,
  TicketStatus,
} from '@raffle-tracker/dto';
import { BaseRepository } from './BaseRepository.js';

export class TicketRepository extends BaseRepository<Ticket, TicketDTO> {
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

  public async createTickets(
    requests: CreateTicketsRequest[]
  ): Promise<TicketDTO[]> {
    const tickets: TicketDTO[] = [];
    // return this.prisma.$transaction(async tx => {});
    return tickets;
  }

  // public async createTickets(
  //   requests: CreateTicketsRequest[]
  // ): Promise<TicketDTO[]> {
  //   return this.prisma.$transaction(async tx => {
  //     const createdTickets: Ticket[] = [];
  //     const now = new Date();

  //     for (const request of requests) {
  //       const contest = await tx.contest.findUnique({
  //         where: { id: request.contestId },
  //       });
  //       if (!contest) {
  //         throw new Error('Contest not found');
  //       }

  //       // We have to lock to make sure the round robin horse assignment is
  //       // consistent. Otherwise we could hit a race condition.
  //       await EphemeralLock.withLock('createTicketsForContest', async () => {
  //         // Get current ticket count for this contest
  //         const ticketCount = await tx.ticket.count({
  //           where: { contest_id: request.contestId },
  //         });

  //         // Get number of active horses (not scratched)
  //         const activeHorses = await tx.horse.findMany({
  //           where: { contest_id: request.contestId, scratch: false },
  //         });
  //         if (activeHorses.length === 0) {
  //           throw new Error('No active horses available for ticket assignment');
  //         }

  //         // Create tickets for this contest
  //         let horseIndex = (ticketCount + 1) % activeHorses.length;
  //         for (let i = 0; i < request.numberOfTickets; i++) {
  //           const selectedHorse = activeHorses[horseIndex];
  //           const ticket = await tx.ticket.create({
  //             data: {
  //               event_id: contest.event_id,
  //               contest_id: request.contestId,
  //               horse_id: selectedHorse.number,
  //               created_dttm: now,
  //               status: 'CREATED',
  //             },
  //           });
  //           createdTickets.push(ticket);
  //           horseIndex = (horseIndex + 1) % activeHorses.length;
  //         }
  //       });
  //     }

  //     return createdTickets.map(ticket => TicketRepository.toDTO(ticket));
  //   });
  // }
}
