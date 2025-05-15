import { PrismaClient } from "@prisma/client";
import { EventRepository } from "./repository/EventRepository.js";
import { EventService } from "./services/EventService.js";

// Single Prisma client instance for the whole app
const prisma = new PrismaClient();

// Create the container with all services
export const container = {
  services: {
    // Each entity gets its own service in the container
    event: new EventService(new EventRepository(prisma)),
  },
} as const;
