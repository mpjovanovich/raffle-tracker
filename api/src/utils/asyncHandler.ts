import { NextFunction, Request, Response } from 'express';

// The point of this utility function is to wrap an express route handler in a
// try/catch
const asyncHandler = (
  // This is the signature of an Express route handler function
  requestHandler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) => {
  // Return a function with the same signature, except this time wrapped in a
  // try/catch that will forward the error to the next middleware.
  return (req: Request, res: Response, next: NextFunction) => {
    // Promise.resolve() is used to resolve any async operations in the
    // requestHandler.
    Promise.resolve(requestHandler(req, res, next)).catch(error => {
      next(error);
    });
  };
};

export { asyncHandler };
