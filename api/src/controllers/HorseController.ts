import { Request, Response } from 'express';
import { APIResponse } from '../utility/APIResponse.js';
import { asyncHandler } from '../utility/asyncHandler.js';
import { prisma } from '../db.js';
import { HorseRepository } from '@/repository/HorseRepository.js';
import { HorseService } from '@/services/HorseService.js';

class HorseController {
  private horseService: HorseService;

  constructor() {
    const horseRepository = new HorseRepository(prisma);
    this.horseService = new HorseService(horseRepository);
  }

  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.horseId);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.horseId}`);
    }
    await this.horseService.delete(id);
    res.status(200).json(new APIResponse(200, 'Horse deleted'));
  });
}

const horseController = new HorseController();
export default horseController;
