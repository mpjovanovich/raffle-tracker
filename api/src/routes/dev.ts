import { getTicketCounts } from '@/sql/getEventTicketCounts.js';
import { APIResponse } from '@/utils/APIResponse.js';
import { sendEmail } from '@/utils/mailer.js';
import { PrismaClient } from '@prisma/client';
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

router.route('/email').get(async (req: Request, res: Response) => {
  await sendEmail(
    'Test Email',
    'This is a test email',
    'mpjovanovich@gmail.com'
  );
  res.status(200).json({ message: 'Email sent' });
});

router.route('/test').get(async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  const ticketCounts = await getTicketCounts(prisma, 1);
  res.status(200).json(new APIResponse(200, ticketCounts));
});

export default router;
