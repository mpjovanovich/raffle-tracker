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
    // // Create new contest with defaults
    // const contest = await this.repo.insert({
    //   id: 0,
    //   eventId: createTicketRequest.eventId,
    //   number: createTicketRequest.contestNumber,
    //   closed: 0,
    // });
    // // Create new horses with defaults
    // const horses: HorseDTO[] = [];
    // for (let i = 1; i < createTicketRequest.numberOfHorses + 1; i++) {
    //   horses.push({
    //     id: 0,
    //     contestId: contest.id,
    //     number: i,
    //     winner: 0,
    //     scratch: 0,
    //   });
    // }
    // await this.horseService.insertMany(horses);
    // return this.getWithChildren(contest.id);
    return null;
  }
}
