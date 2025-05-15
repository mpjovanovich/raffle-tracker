import { Request, Response } from 'express';
import { APIResponse } from '../utility/APIResponse.js';
import { asyncHandler } from '../utility/asyncHandler.js';

const healthcheck = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json(new APIResponse(200, 'OK'));
});

export { healthcheck };
