import { HorseRepository } from '@/repository/HorseRepository.js';
import { RaceRepository } from '@/repository/RaceRepository.js';
import { HorseService } from '@/services/HorseService.js';
import { RaceService } from '@/services/RaceService.js';
import {
  CreateRaceRequest,
  Race as RaceDTO,
} from '@horse-race-raffle-tracker/dto';
import { Request, Response } from 'express';
import { prisma } from '../db.js';
import { APIResponse } from '../utility/APIResponse.js';
import { asyncHandler } from '../utility/asyncHandler.js';

class RaceController {
  private raceService: RaceService;

  constructor() {
    const raceRepository = new RaceRepository(prisma);
    const horseService = new HorseService(new HorseRepository(prisma));
    this.raceService = new RaceService(raceRepository, horseService);
  }

  createRace = asyncHandler(async (req: Request, res: Response) => {
    const createRaceRequest: CreateRaceRequest = req.body;
    const item = await this.raceService.createRace(createRaceRequest);
    res.status(200).json(new APIResponse(200, item));
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.raceId);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.raceId}`);
    }
    await this.raceService.delete(id);
    res.status(200).json(new APIResponse(200, 'Race deleted'));
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.raceId);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.raceId}`);
    }

    // Check for the include parameter
    let item: RaceDTO | null = null;
    const includeChildren = req.query.includeChildren === 'true';
    if (includeChildren) {
      item = await this.raceService.getWithChildren(id);
    } else {
      item = await this.raceService.getById(id);
    }
    res.status(200).json(new APIResponse(200, item));
  });
}

const raceController = new RaceController();
export default raceController;
