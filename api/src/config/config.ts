import dotenv from 'dotenv';

const keys = {
  corsOrigin: 'CORS_ORIGIN',
  databaseUrl: 'DATABASE_URL',
  logDir: 'LOG_DIR',
  nodeEnv: 'NODE_ENV',
  port: 'PORT',
} as const;

// Only load .env file in development
if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

// Make sure all required environment variables are set
for (const key of Object.values(keys)) {
  if (!process.env[key]) {
    throw new Error(`${key} is required`);
  }
}

// Environment variables with defaults
export const config = {
  corsOrigin: process.env.CORS_ORIGIN as string,
  databaseUrl: process.env.DATABASE_URL as string,
  logDir: process.env.LOG_DIR as string,
  nodeEnv: process.env.NODE_ENV as 'development' | 'production' | 'test',
  port: parseInt(process.env.PORT as string),
} as const;
