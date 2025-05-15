import { Request, Response, NextFunction } from 'express';
import { container } from '../container.js';

// Extends the Express Request type.
// TODO: I don't fully understand this bit. Need to read more on it.
declare global {
  namespace Express {
    interface Request {
      // Add a new property to the Request - "container"
      container: typeof container;
    }
  }
}

export const containerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.container = container;
  next();
};
