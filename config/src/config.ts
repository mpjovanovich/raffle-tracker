import dotenv from 'dotenv';

/* 
DO NOT INCLUDE DOLLAR SIGNS IN ENV VARS SUCH AS SECRET KEYS
 - OMFG YOU WILL HATE YOUR LIFE
*/
const requiredKeys = {
  apiPort: 'API_PORT',
  apiBaseUrl: 'API_BASE_URL',
  corsOrigin: 'CORS_ORIGIN',
  databaseUrl: 'DATABASE_URL',
  emailFrom: 'EMAIL_FROM',
  emailUser: 'EMAIL_USER',
  emailPassword: 'EMAIL_PASSWORD',
  emailProvider: 'EMAIL_PROVIDER',
  jwtSecretKey: 'JWT_SECRET_KEY',
  logDir: 'LOG_DIR',
  nodeEnv: 'NODE_ENV',
  webPort: 'WEB_PORT',
} as const;

// Only load .env file in development
// if (process.env.NODE_ENV === 'development') {
dotenv.config({ path: '../.env' });
// }

// Make sure all required environment variables are set
for (const key of Object.values(requiredKeys)) {
  if (!process.env[key]) {
    throw new Error(`${key} is required`);
  }
}

// Environment variables with defaults
export const config = {
  apiPort: parseInt(process.env.API_PORT!),
  apiBaseUrl: process.env.API_BASE_URL!,
  corsOrigin: process.env.CORS_ORIGIN!,
  databaseUrl: process.env.DATABASE_URL!,
  emailDisabled: process.env.EMAIL_DISABLED === 'true',
  emailFrom: process.env.EMAIL_FROM!,
  emailHost: process.env.EMAIL_HOST!,
  emailPassword: process.env.EMAIL_PASSWORD!,
  emailPort: parseInt(process.env.EMAIL_PORT ?? '2525'),
  emailProvider: process.env.EMAIL_PROVIDER!,
  emailUser: process.env.EMAIL_USER!,
  jwtSecretKey: process.env.JWT_SECRET_KEY!,
  jwtAuthTokenExpiresIn: process.env.JWT_AUTH_TOKEN_EXPIRES_IN
    ? JSON.parse(process.env.JWT_AUTH_TOKEN_EXPIRES_IN)
    : { jwtExpiresIn: '2h', expiresInSeconds: 2 * 60 * 60 },
  jwtVerifyTokenExpiresIn: process.env.JWT_VERIFY_TOKEN_EXPIRES_IN
    ? JSON.parse(process.env.JWT_VERIFY_TOKEN_EXPIRES_IN)
    : { jwtExpiresIn: '1h', expiresInSeconds: 1 * 60 * 60 },
  logDir: process.env.LOG_DIR!,
  nodeEnv: process.env.NODE_ENV as 'development' | 'production' | 'test',
  webPort: parseInt(process.env.WEB_PORT!),
} as const;
