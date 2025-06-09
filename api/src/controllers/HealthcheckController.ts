import { Request, Response } from 'express';
import { APIResponse } from '../utils/APIResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

class Healthcheck {
  healthcheck = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json(new APIResponse(200, 'OK'));
  });
}

const healthcheck = new Healthcheck();
export default healthcheck;
