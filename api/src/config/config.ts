import dotenv from 'dotenv';

const requiredKeys = {
  corsOrigin: 'CORS_ORIGIN',
  databaseUrl: 'DATABASE_URL',
  jwtSecretKey: 'JWT_SECRET_KEY',
  logDir: 'LOG_DIR',
  nodeEnv: 'NODE_ENV',
  port: 'PORT',
  emailFrom: 'EMAIL_FROM',
  emailUser: 'EMAIL_USER',
  emailPassword: 'EMAIL_PASSWORD',
  emailProvider: 'EMAIL_PROVIDER',
} as const;

// Only load .env file in development
if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

// Make sure all required environment variables are set
for (const key of Object.values(requiredKeys)) {
  if (!process.env[key]) {
    throw new Error(`${key} is required`);
  }
}

// Environment variables with defaults
export const config = {
  corsOrigin: process.env.CORS_ORIGIN!,
  databaseUrl: process.env.DATABASE_URL!,
  emailFrom: process.env.EMAIL_FROM!,
  emailHost: process.env.EMAIL_HOST!,
  emailPassword: process.env.EMAIL_PASSWORD!,
  emailPort: parseInt(process.env.EMAIL_PORT ?? '2525'),
  emailProvider: process.env.EMAIL_PROVIDER!,
  emailUser: process.env.EMAIL_USER!,
  jwtSecretKey: process.env.JWT_SECRET_KEY!,
  jwtAuthTokenExpiresIn:
    (process.env.JWT_AUTH_TOKEN_EXPIRES_IN as string) || '15m',
  jwtRefreshTokenExpiresIn:
    (process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as string) || '1d',
  jwtTempTokenExpiresIn:
    (process.env.JWT_TEMP_TOKEN_EXPIRES_IN as string) || '5m',
  jwtVerifyTokenExpiresIn:
    (process.env.JWT_VERIFY_TOKEN_EXPIRES_IN as string) || '1h',
  logDir: process.env.LOG_DIR!,
  nodeEnv: process.env.NODE_ENV as 'development' | 'production' | 'test',
  port: parseInt(process.env.PORT!),
} as const;
