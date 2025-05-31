import { BaseRepository } from './BaseRepository.js';
import {
  Ticket as TicketDTO,
  TicketStatus,
} from '@horse-race-raffle-tracker/dto';
import { PrismaClient, Ticket } from '.prisma/client';

export class TicketRepository extends BaseRepository<Ticket, TicketDTO> {
  constructor(prisma: PrismaClient) {
    super(prisma, 'ticket');
  }

  public toDTO(ticket: Ticket): TicketDTO {
    return {
      id: ticket.id,
      eventId: ticket.event_id,
      raceId: ticket.race_id,
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

  protected toPrisma(ticket: TicketDTO): Ticket {
    return {
      id: ticket.id,
      event_id: ticket.eventId,
      race_id: ticket.raceId,
      horse_id: ticket.horseId,
      created_dttm: new Date(ticket.createdDttm),
      redeemed_dttm: ticket.redeemedDttm ? new Date(ticket.redeemedDttm) : null,
      refunded_dttm: ticket.refundedDttm ? new Date(ticket.refundedDttm) : null,
      status: ticket.status as TicketStatus,
    };
  }
}
