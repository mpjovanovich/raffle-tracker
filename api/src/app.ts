import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { config } from './config/config.js';
import logger from './utility/logger.js';

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
import healthcheckRouter from './routes/healthcheck.js';
import eventsRouter from './routes/events.js';
import racesRouter from './routes/races.js';

// Routes (implement)
app.use('/api/healthcheck', healthcheckRouter);
app.use('/api/events', eventsRouter);
app.use('/api/races', racesRouter);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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
