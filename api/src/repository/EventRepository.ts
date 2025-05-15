import { BaseRepository } from "./BaseRepository.js";
import { event } from "../generated/prisma/index.js";
import { Event } from "@horse-race-raffle-tracker/dto";
import { PrismaClient } from "@prisma/client";

export class EventRepository extends BaseRepository<event, Event> {
  constructor(prisma: PrismaClient) {
    super(prisma, "event");
  }

  protected toDTO(eventModel: event): Event {
    return {
      id: eventModel.id,
      name: eventModel.name,
      location: eventModel.location,
      startDate: eventModel.start_date,
      endDate: eventModel.end_date,
    };
  }
}
