import { Request, Response } from 'express';
import { APIResponse } from '../utility/APIResponse.js';
import { asyncHandler } from '../utility/asyncHandler.js';
import { prisma } from '../db.js';
import { EventService } from '../services/EventService.js';
import { EventRepository } from '../repository/EventRepository.js';

// TODO: Validate the request body. Can put this in middleware using Zod.

class EventController {
  private eventService: EventService;

  constructor() {
    const eventRepository = new EventRepository(prisma);
    this.eventService = new EventService(eventRepository);
  }

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const items = await this.eventService.getAll();
    res.status(200).json(new APIResponse(200, JSON.stringify(items)));
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.id}`);
    }
    const item = await this.eventService.getById(id);
    res.status(200).json(new APIResponse(200, JSON.stringify(item)));
  });

  insert = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.eventService.insert(req.body);
    res.status(200).json(new APIResponse(200, JSON.stringify(item)));
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.eventService.update(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(new APIResponse(200, JSON.stringify(item)));
  });
}

const eventController = new EventController();
export default eventController;
