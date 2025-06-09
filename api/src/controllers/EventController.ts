import { Event as EventDTO } from '@raffle-tracker/dto';
import { Request, Response } from 'express';
import { prisma } from '../db.js';
import { EventService } from '../services/EventService.js';
import { APIResponse } from '../utility/APIResponse.js';
import { asyncHandler } from '../utility/asyncHandler.js';

// TODO: Validate the request body. Can put this in middleware using Zod.
class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService(prisma);
  }

  // EVENT
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const items = await this.eventService.getAll();
    res.status(200).json(new APIResponse(200, items));
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.eventId);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.eventId}`);
    }

    // Check for the include parameter
    let item: EventDTO | null = null;
    const includeChildren = req.query.includeChildren === 'true';
    const includeClosed = req.query.includeClosed === 'true';

    if (includeChildren) {
      item = await this.eventService.getWithChildren(id);
    } else {
      item = await this.eventService.getById(id);
    }

    // This is to strip out closed contests and horses from the response
    if (item && !includeClosed) {
      item = this.eventService.getEventValidTicketItems(item);
    }

    res.status(200).json(new APIResponse(200, item));
  });

  insert = asyncHandler(async (req: Request, res: Response) => {
    const event: EventDTO = req.body;
    const item = await this.eventService.insert(event);
    res.status(200).json(new APIResponse(200, item));
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const eventId = parseInt(req.params.eventId);
    const event: EventDTO = req.body;
    if (isNaN(eventId)) {
      throw new Error(`Invalid ID format: ${req.params.eventId}`);
    }

    const item = await this.eventService.update(eventId, event);
    res.status(200).json(new APIResponse(200, item));
  });
}

const eventController = new EventController();
export default eventController;
