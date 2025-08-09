/* 
DO NOT INCLUDE DOLLAR SIGNS IN ENV VARS SUCH AS SECRET KEYS
 - OMFG YOU WILL HATE YOUR LIFE
*/
const requiredKeys = {
  apiPort: 'API_PORT',
  apiBaseUrl: 'API_BASE_URL',
  corsOrigin: 'CORS_ORIGIN',
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
  apiAuthDisabled: process.env.API_AUTH_DISABLED === 'true',
  apiBaseUrl: process.env.API_BASE_URL!,
  apiPort: parseInt(process.env.API_PORT!),
  cookieDomain: process.env.COOKIE_DOMAIN,
  corsOrigin: process.env.CORS_ORIGIN!,
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecretKey: process.env.JWT_SECRET_KEY!,
  jwtAuthTokenExpiresInSeconds: process.env.JWT_AUTH_TOKEN_EXPIRES_IN_SECONDS
    ? parseInt(process.env.JWT_AUTH_TOKEN_EXPIRES_IN_SECONDS)
    : 60 * 60 * 8,
  jwtVerifyTokenExpiresInSeconds: process.env
    .JWT_VERIFY_TOKEN_EXPIRES_IN_SECONDS
    ? parseInt(process.env.JWT_VERIFY_TOKEN_EXPIRES_IN_SECONDS)
    : 60 * 60 * 1,
  logDir: process.env.LOG_DIR!,
  nodeEnv: process.env.HACKED_NODE_ENV_BECAUSE_NEXT_JS_HAS_TOO_MANY_RULES as
    | 'development'
    | 'production'
    | 'test',
  webBaseUrl: process.env.WEB_BASE_URL!,
  webPort: parseInt(process.env.WEB_PORT!),
} as const;
