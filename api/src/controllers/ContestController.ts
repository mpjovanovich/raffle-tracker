import { ContestRepository } from '@/repository/ContestRepository.js';
import { HorseRepository } from '@/repository/HorseRepository.js';
import { ContestService } from '@/services/ContestService.js';
import { HorseService } from '@/services/HorseService.js';
import {
  Contest as ContestDTO,
  CreateContestRequest,
} from '@raffle-tracker/dto';
import { Request, Response } from 'express';
import { prisma } from '../db.js';
import { APIResponse } from '../utility/APIResponse.js';
import { asyncHandler } from '../utility/asyncHandler.js';

class ContestController {
  private contestService: ContestService;

  constructor() {
    const contestRepository = new ContestRepository(prisma);
    const horseService = new HorseService(new HorseRepository(prisma));
    this.contestService = new ContestService(contestRepository, horseService);
  }

  createContest = asyncHandler(async (req: Request, res: Response) => {
    const createContestRequest: CreateContestRequest = req.body;
    const item = await this.contestService.createContest(createContestRequest);
    res.status(200).json(new APIResponse(200, item));
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.contestId);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.contestId}`);
    }
    await this.contestService.delete(id);
    res.status(200).json(new APIResponse(200, 'Contest deleted'));
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const id = parseInt(req.params.contestId);
    if (isNaN(id)) {
      throw new Error(`Invalid ID format: ${req.params.contestId}`);
    }

    // Check for the include parameter
    let item: ContestDTO | null = null;
    const includeChildren = req.query.includeChildren === 'true';
    if (includeChildren) {
      item = await this.contestService.getWithChildren(id);
    } else {
      item = await this.contestService.getById(id);
    }
    res.status(200).json(new APIResponse(200, item));
  });
}

const contestController = new ContestController();
export default contestController;
