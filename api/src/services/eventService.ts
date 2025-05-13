import { PrismaClient, event } from "../generated/prisma/index.js";
import { Event } from "@horse-race-raffle-tracker/common";

const prisma = new PrismaClient();

export const eventService = {
  async findAll(): Promise<Event[]> {
    const events = await prisma.event.findMany();

    return events.map((event: event) => ({
      id: event.id,
      name: event.name,
      location: event.location,
      startDate: event.start_date,
      endDate: event.end_date,
    }));
  },

  async create(event: Event): Promise<Event> {
    if (event.id !== 0) {
      throw new Error("Cannot create event with non-zero ID");
    }

    const created = await prisma.event.create({
      data: {
        name: event.name,
        location: event.location,
        start_date: event.startDate,
        end_date: event.endDate,
      },
    });

    event.id = created.id;
    return event;
  },
};
