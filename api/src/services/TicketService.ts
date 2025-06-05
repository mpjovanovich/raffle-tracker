import { TicketRepository } from '@/repository/TicketRepository.js';
import {
  CreateTicketsRequest,
  Ticket as TicketDTO,
} from '@horse-race-raffle-tracker/dto';
import { BaseService } from './BaseService.js';

export class TicketService extends BaseService<TicketRepository> {
  constructor(private raceRepository: TicketRepository) {
    super(raceRepository);
  }

  public async createTickets(
    createTicketRequests: CreateTicketsRequest[]
  ): Promise<TicketDTO[] | null> {
    // // Create new race with defaults
    // const race = await this.repo.insert({
    //   id: 0,
    //   eventId: createTicketRequest.eventId,
    //   number: createTicketRequest.raceNumber,
    //   closed: 0,
    // });
    // // Create new horses with defaults
    // const horses: HorseDTO[] = [];
    // for (let i = 1; i < createTicketRequest.numberOfHorses + 1; i++) {
    //   horses.push({
    //     id: 0,
    //     raceId: race.id,
    //     number: i,
    //     winner: 0,
    //     scratch: 0,
    //   });
    // }
    // await this.horseService.insertMany(horses);
    // return this.getWithChildren(race.id);
    return null;
  }
}
