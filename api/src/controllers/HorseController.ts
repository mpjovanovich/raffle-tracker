import { HorseService } from '@/services/HorseService.js';
import { CreateHorseRequest } from '@raffle-tracker/dto';
import { Request, Response } from 'express';
import { prisma } from '../db.js';
import { APIResponse } from '../utils/APIResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

class HorseController {
  private horseService: HorseService;

  constructor() {
    this.horseService = new HorseService(prisma);
  }

  createHorse = asyncHandler(async (req: Request, res: Response) => {
    const createHorseRequest: CreateHorseRequest = req.body;
    const horse = await this.horseService.createHorse(createHorseRequest);
    res.status(200).json(new APIResponse(200, horse));
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.horseId);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.horseId}`);
    }
    await this.horseService.delete(id);
    res.status(200).json(new APIResponse(200, 'Horse deleted'));
  });

  toggleScratch = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.horseId);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.horseId}`);
    }
    const horse = await this.horseService.toggleScratch(id);
    res.status(200).json(new APIResponse(200, horse));
  });

  toggleWinner = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.horseId);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.horseId}`);
    }
    const horse = await this.horseService.toggleWinner(id);
    res.status(200).json(new APIResponse(200, horse));
  });
}

const horseController = new HorseController();
export default horseController;
