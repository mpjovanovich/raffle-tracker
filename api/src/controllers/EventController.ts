import { Request, Response } from 'express';
import { APIResponse } from '../utility/APIResponse.js';
import { asyncHandler } from '../utility/asyncHandler.js';
import { prisma } from '../db.js';
import {
  Event as EventDTO,
  Race as RaceDTO,
} from '@horse-race-raffle-tracker/dto';
import { EventRepository } from '../repository/EventRepository.js';
import { EventService } from '../services/EventService.js';
import { HorseRepository } from '@/repository/HorseRepository.js';
import { HorseService } from '@/services/HorseService.js';
import { RaceRepository } from '@/repository/RaceRepository.js';
import { RaceService } from '@/services/RaceService.js';

// TODO: Validate the request body. Can put this in middleware using Zod.
class EventController {
  private eventService: EventService;

  constructor() {
    const eventRepository = new EventRepository(prisma);
    const raceService = new RaceService(new RaceRepository(prisma));
    const horseService = new HorseService(new HorseRepository(prisma));
    this.eventService = new EventService(
      eventRepository,
      raceService,
      horseService
    );
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
    if (includeChildren) {
      item = await this.eventService.getWithChildren(id);
    } else {
      item = await this.eventService.getById(id);
    }
    res.status(200).json(new APIResponse(200, item));
  });

  insert = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.eventService.insert(req.body);
    res.status(200).json(new APIResponse(200, item));
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.eventService.update(
      parseInt(req.params.eventId),
      req.body
    );
    res.status(200).json(new APIResponse(200, item));
  });

  // RACES
  addRace = asyncHandler(async (req: Request, res: Response) => {
    const item = await this.eventService.addRace(
      parseInt(req.params.eventId),
      parseInt(req.body.raceNumber),
      parseInt(req.body.numberOfHorses)
    );
    res.status(200).json(new APIResponse(200, item));
  });

  deleteRace = asyncHandler(async (req: Request, res: Response) => {
    await this.eventService.deleteRace(parseInt(req.params.raceId));
    res.status(200).json(new APIResponse(200, 'Race deleted'));
  });

  getRaceById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.raceId);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.raceId}`);
    }

    // Check for the include parameter
    let item: RaceDTO | null = null;
    const includeChildren = req.query.includeChildren === 'true';
    if (includeChildren) {
      item = await this.eventService.getRaceWithChildren(id);
    } else {
      item = await this.eventService.getRaceById(id);
    }
    res.status(200).json(new APIResponse(200, item));
  });
}

const eventController = new EventController();
export default eventController;
