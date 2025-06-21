import { config } from '@/config/config.js';
import { UserService } from '@/services/UserService.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { TokenPayload, verifyToken } from '@/utils/authUtility.js';
import { ROLE } from '@raffle-tracker/dto';
import { NextFunction, Request, Response } from 'express';

const devUser = {
  id: -1,
  username: 'dev',
  password: 'dev-password',
  email: 'dev@dev.com',
  verified: 1,
  token: 'dev-token',
  roles: [ROLE.ADMIN],
};

// Factory that returns a middleware function with UserService injected
export const createAuthMiddleware = (userService: UserService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Skip auth for login routes
      if (req.path.includes('login')) {
        return next();
      }

      // Skip auth for devs
      if (config.nodeEnv === 'development' && config.skipAuth) {
        req.user = devUser;
        return next();
      }

      // Auth header checks
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access token required' });
      }

      // Remove 'Bearer ' prefix
      const token = authHeader.substring(7);

      try {
        const decoded = (await verifyToken(token)) as TokenPayload;
        const userId = parseInt(decoded.userId);
        const user = await userService.getById(userId);

        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }
        req.user = user;

        return next();
      } catch (error) {
        // TODO: proper error type and token refresh
        if (error instanceof Error && error.message.includes('expired')) {
          // Auth token expired, try to refresh using the refresh token
          // handleTokenRefresh should return a new auth token and a new refresh
          // token if we're within expiry window. Otherwise clear the token from
          // the user and return 401
          // return await handleTokenRefresh(req, res, next);
        }
        throw error;
      }
    } catch (error) {
      return res
        .status(401)
        .json(new APIResponse(401, 'Failed to authenticate'));
    }
  };
};

// Default export for backward compatibility
export default createAuthMiddleware;
