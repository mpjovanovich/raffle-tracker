import { APIResponse } from '@/utils/APIResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { sendEmail } from '@/utils/mailer.js';
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

  testEmail = asyncHandler(async (req: Request, res: Response) => {
    // Don't allow spam in production
    if (process.env.NODE_ENV === 'production') {
      res.status(404).json(new APIResponse(404, 'Not Found'));
    }

    const email = 'test@test.com';
    const subject = 'Test Subject';
    const html = '<h1>Test Email</h1><p>This is a test email</p>';
    await sendEmail(subject, html, email);
    res.status(200).json(new APIResponse(200, 'Email sent'));
  });
}

const healthcheck = new Healthcheck();
export default healthcheck;
