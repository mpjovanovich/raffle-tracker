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

  protected toDTO(ticket: Ticket): TicketDTO {
    return {
      id: ticket.id,
      eventId: ticket.event_id,
      raceId: ticket.race_id,
      horseId: ticket.horse_id,
      createdDttm: new Date(ticket.created_dttm),
      redeemedDttm: ticket.redeemed_dttm
        ? new Date(ticket.redeemed_dttm)
        : null,
      refundedDttm: ticket.refunded_dttm
        ? new Date(ticket.refunded_dttm)
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
      created_dttm: ticket.createdDttm,
      redeemed_dttm: ticket.redeemedDttm?.toISOString() || null,
      refunded_dttm: ticket.refundedDttm?.toISOString() || null,
      status: ticket.status as TicketStatus,
    };
  }
}
