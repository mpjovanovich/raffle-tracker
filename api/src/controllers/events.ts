import { Request, Response } from 'express';
import { APIResponse } from '../utility/APIResponse.js';
import { asyncHandler } from '../utility/asyncHandler.js';
import { prisma } from '../db.js';
import { EventService } from '../services/EventService.js';
import { EventRepository } from '../repository/EventRepository.js';

// Create a single instance of the service
const eventRepository = new EventRepository(prisma);
const eventService = new EventService(eventRepository);

const fetchAll = asyncHandler(async (req: Request, res: Response) => {
  const items = await eventService.fetchAll();
  res.status(200).json(new APIResponse(200, JSON.stringify(items)));
});

export { fetchAll };
