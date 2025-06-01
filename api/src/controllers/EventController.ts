import { Request, Response } from 'express';
import { APIResponse } from '../utility/APIResponse.js';
import { asyncHandler } from '../utility/asyncHandler.js';
import { prisma } from '../db.js';
import { Event as EventDTO } from '@horse-race-raffle-tracker/dto';
import { EventService } from '../services/EventService.js';
import { EventRepository } from '../repository/EventRepository.js';

// TODO: Validate the request body. Can put this in middleware using Zod.
class EventController {
  private eventService: EventService;

  constructor() {
    const eventRepository = new EventRepository(prisma);
    this.eventService = new EventService(eventRepository);
  }

  addRaces = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.eventService.addRaces(
      parseInt(req.params.id),
      parseInt(req.body.raceNumber),
      parseInt(req.body.numberOfHorses)
    );
    res.status(200).json(new APIResponse(200, item));
  });

  deleteRace = asyncHandler(async (req: Request, res: Response) => {
    await this.eventService.deleteRace(parseInt(req.params.raceId));
    res.status(200).json(new APIResponse(200, 'Race deleted'));
  });

  getAll = asyncHandler(async (req: Request, res: Response) => {
    const items = await this.eventService.getAll();
    res.status(200).json(new APIResponse(200, items));
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.id}`);
    }

    // Check for the include parameter
    let item: EventDTO | null = null;
    const includeChildren = req.query.includeChildren === 'true';
    if (includeChildren) {
      item = await this.eventService.getWithChildren(id);
    } else {
      item = await this.eventService.getById(id);
    }
    res.status(200).json(new APIResponse(200, item));
  });

  getWithChildren = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.eventService.getWithChildren(
      parseInt(req.params.id)
    );
    res.status(200).json(new APIResponse(200, item));
  });

  insert = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.eventService.insert(req.body);
    res.status(200).json(new APIResponse(200, item));
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.eventService.update(
      parseInt(req.params.id),
      req.body
    );
    res.status(200).json(new APIResponse(200, item));
  });
}

const eventController = new EventController();
export default eventController;
