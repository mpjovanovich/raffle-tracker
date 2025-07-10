import logger from '@/utils/logger.js';
import { config } from '@raffle-tracker/config';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { authMiddleware } from './middleware/authmiddleware.js';

const logFormat = ':remote-addr :method :url :status :response-time ms';

// App and middleware
const app = express();
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(logFormat, {
    stream: {
      write: (message: string) => {
        const parts = message.split(' ');
        const logObject = {
          ip: parts[0],
          method: parts[1],
          url: parts[2],
          status: parts[3],
          responseTime: parts[4],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

// Routes (import)
import authRouter from './routes/auth.js';
import contestsRouter from './routes/contests.js';
import devRouter from './routes/dev.js';
import eventsRouter from './routes/events.js';
import healthcheckRouter from './routes/healthcheck.js';
import horsesRouter from './routes/horses.js';
import ordersRouter from './routes/orders.js';
import ticketsRouter from './routes/tickets.js';

// PUBLIC ROUTES
app.use('/api/healthcheck', healthcheckRouter);

// DEV ROUTES
if (config.nodeEnv === 'development') {
  app.use('/api/dev', devRouter);
}

app.use('/api/auth', authRouter);
app.use('/api/events', authMiddleware, eventsRouter);
app.use('/api/contests', authMiddleware, contestsRouter);
app.use('/api/horses', authMiddleware, horsesRouter);
app.use('/api/orders', authMiddleware, ordersRouter);
app.use('/api/tickets', authMiddleware, ticketsRouter);

// Global error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.nodeEnv === 'development' ? err.message : undefined,
  });
});

// Global 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

export default app;
