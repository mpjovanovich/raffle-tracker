import { APIResponse } from '@/utils/APIResponse.js';
import { NextFunction, Request, Response } from 'express';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    userId: string;
  };
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // const authToken =
    //   req.cookies?.authToken ||
    //   req.headers.authorization?.replace('Bearer ', '');
    // if (!authToken) {
    //   return res
    //     .status(401)
    //     .json(new APIResponse(401, 'Access token required'));
    // }
    // try {
    //   // Try to verify the auth token
    //   const decoded = await verifyToken(authToken);
    //   req.user = decoded;
    //   return next();
    // } catch (error) {
    //   if (error instanceof Error && error.message.includes('expired')) {
    //     // Auth token expired, try to refresh using the refresh token
    //     return await handleTokenRefresh(req, res, next);
    //   }
    //   throw error;
    // }
  } catch (error) {
    return res.status(401).json(new APIResponse(401, 'Invalid token'));
  }
};

const handleTokenRefresh = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get refresh token from user's token field in database
    // const authToken =
    //   req.cookies?.authToken ||
    //   req.headers.authorization?.replace('Bearer ', '');
    // if (!authToken) {
    //   return res.status(401).json(new APIResponse(401, 'No token provided'));
    // }
    // // Decode the expired token to get userId (this works even for expired tokens)
    // const decoded = await import('jsonwebtoken').then(jwt =>
    //   jwt.decode(authToken)
    // );
    // if (!decoded || typeof decoded === 'string') {
    //   return res.status(401).json(new APIResponse(401, 'Invalid token format'));
    // }
    // const userId = parseInt(decoded.userId as string);
    // // Find user and get their refresh token
    // const user = await prisma.user.findUnique({
    //   where: { id: userId },
    // });
    // if (!user || !user.token) {
    //   return res
    //     .status(401)
    //     .json(new APIResponse(401, 'User not found or no refresh token'));
    // }
    // // Verify the refresh token
    // try {
    //   const refreshDecoded = await verifyToken(user.token);
    //   // Generate new auth token
    //   const newAuthToken = await generateToken(userId, TOKEN_TYPE.AUTH);
    //   // Set new auth token in cookie
    //   res.cookie('authToken', newAuthToken, {
    //     httpOnly: true,
    //     secure: config.nodeEnv === 'production',
    //     maxAge: parseInt(config.jwtAuthTokenExpiresIn),
    //   });
    //   // Set user in request
    //   req.user = { id: userId, userId: userId.toString() };
    //   return next();
    // } catch (refreshError) {
    //   // Refresh token is also expired
    //   return res
    //     .status(401)
    //     .json(new APIResponse(401, 'Session expired. Please login again.'));
    // }
  } catch (error) {
    return res.status(401).json(new APIResponse(401, 'Token refresh failed'));
  }
};
