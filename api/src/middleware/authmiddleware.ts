import { asyncHandler } from '@/utils/asyncHandler.js';
import { verifyAuthToken } from '@raffle-tracker/auth';
import { config } from '@raffle-tracker/config';
import { AuthenticatedUser } from '@raffle-tracker/dto';
import { NextFunction, Request, Response } from 'express';

// Extend the Express Request interface to include the authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (config.apiAuthDisabled) {
      next();
      return;
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid authorization header',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const user = await verifyAuthToken(token);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({
        error: 'Unauthorized',
        message: error instanceof Error ? error.message : 'Invalid token',
      });
      return;
    }
  }
);
