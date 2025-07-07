import { config } from '@raffle-tracker/config';
import { NextFunction, Request, Response, Router } from 'express';

/*
If this file gets large enough we can add a controller and/or split it up.
*/
const router = Router();

// Dev-only middleware to ensure this only runs in development
router.use((req: Request, res: Response, next: NextFunction) => {
  if (config.nodeEnv !== 'development') {
    res.status(404).json({ error: 'Not Found' });
    return;
  }
  next();
});

export default router;
