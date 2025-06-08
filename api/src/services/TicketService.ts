import { TicketRepository } from '@/repository/TicketRepository.js';
import { CreateTicketsRequest, Ticket as TicketDTO } from '@raffle-tracker/dto';
import { BaseService } from './BaseService.js';

export class TicketService extends BaseService<TicketRepository> {
  constructor(private ticketRepository: TicketRepository) {
    super(ticketRepository);
  }

  public async createTickets(
    createTicketRequests: CreateTicketsRequest[]
  ): Promise<TicketDTO[] | null> {
    return this.ticketRepository.createTickets(createTicketRequests);
  }
}
