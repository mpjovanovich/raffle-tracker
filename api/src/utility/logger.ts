import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';
import { mkdir } from 'fs/promises';

// Set up the log directory
dotenv.config();
const logDir = process.env.LOG_DIR || './logs';
await mkdir(logDir, { recursive: true });

// These are all tools that winston provides
const { combine, timestamp, json } = format;

// For console logging
const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message }) => {
    return `${level}: ${message}`;
  })
);

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({
      filename: `${logDir}/app.log`,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

export default logger;
