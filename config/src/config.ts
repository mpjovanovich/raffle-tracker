/* 
DO NOT INCLUDE DOLLAR SIGNS IN ENV VARS SUCH AS SECRET KEYS
 - OMFG YOU WILL HATE YOUR LIFE
*/
const requiredKeys = {
  apiPort: 'API_PORT',
  apiBaseUrl: 'API_BASE_URL',
  corsOrigin: 'CORS_ORIGIN',
  emailFrom: 'EMAIL_FROM',
  emailPassword: 'EMAIL_PASSWORD',
  emailProvider: 'EMAIL_PROVIDER',
  emailUser: 'EMAIL_USER',
  jwtSecretKey: 'JWT_SECRET_KEY',
  logDir: 'LOG_DIR',
  nodeEnv: 'HACKED_NODE_ENV_BECAUSE_NEXT_JS_HAS_TOO_MANY_RULES',
  webBaseUrl: 'WEB_BASE_URL',
  webPort: 'WEB_PORT',
} as const;

// This was pulled into a function last minute to address issues with passing
// enviroment variables to the build container. We'll just have to be dilligent
// about checking for missing variables in the release environment.
export function validateConfig() {
  const missing = Object.values(requiredKeys).filter(key => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
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
    ? parseInt(process.env.JWT_AUTH_TOKEN_EXPIRES_IN)
    : 8 * 60 * 60,
  jwtVerifyTokenExpiresIn: process.env.JWT_VERIFY_TOKEN_EXPIRES_IN
    ? parseInt(process.env.JWT_VERIFY_TOKEN_EXPIRES_IN)
    : 1 * 60 * 60,
  logDir: process.env.LOG_DIR!,
  nodeEnv: process.env.HACKED_NODE_ENV_BECAUSE_NEXT_JS_HAS_TOO_MANY_RULES as
    | 'development'
    | 'production'
    | 'test',
  webBaseUrl: process.env.WEB_BASE_URL!,
  webPort: parseInt(process.env.WEB_PORT!),
} as const;
