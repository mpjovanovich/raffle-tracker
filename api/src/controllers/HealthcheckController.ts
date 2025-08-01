import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { Request, Response } from 'express';

class Healthcheck {
  healthcheck = asyncHandler(async (req: Request, res: Response) => {
    const healthStatus = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
    res.status(200).json(new APIResponse(200, healthStatus));
  });
}

const healthcheck = new Healthcheck();
export default healthcheck;
