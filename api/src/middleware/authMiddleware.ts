import { APIResponse } from '@/utils/APIResponse.js';
import { TokenPayload, verifyToken } from '@/utils/authUtility.js';
import { NextFunction, Request, Response } from 'express';

// TODO: not sure if I should pass the whole user object or just the id
interface AuthenticatedRequest extends Request {
  userId: number;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authToken =
      req.cookies?.authToken ||
      req.headers.authorization?.replace('Bearer ', '');

    if (!authToken) {
      return res
        .status(401)
        .json(new APIResponse(401, 'Access token required'));
    }

    try {
      const decoded = (await verifyToken(authToken)) as TokenPayload;
      req.userId = parseInt(decoded.userId);
      return next();
    } catch (error) {
      // TODO: propper error type and token refresh
      if (error instanceof Error && error.message.includes('expired')) {
        // Auth token expired, try to refresh using the refresh token
        // return await handleTokenRefresh(req, res, next);
      }
      throw error;
    }
  } catch (error) {
    return res.status(401).json(new APIResponse(401, 'Invalid token'));
  }
};
