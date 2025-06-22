import { prisma } from '@/db.js';
import { ContestService } from '@/services/ContestService.js';
import { HorseService } from '@/services/HorseService.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import {
  Contest as ContestDTO,
  CreateContestRequest,
} from '@raffle-tracker/dto';
import { Request, Response } from 'express';

class ContestController {
  private contestService: ContestService;

  constructor() {
    this.contestService = new ContestService(prisma, new HorseService(prisma));
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
    res.status(200).json(new APIResponse(200, null, 'Contest deleted'));
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
