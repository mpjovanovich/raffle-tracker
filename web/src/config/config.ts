/* 
DO NOT INCLUDE DOLLAR SIGNS IN ENV VARS SUCH AS SECRET KEYS
 - OMFG YOU WILL HATE YOUR LIFE
*/
const keys = {
  jwtSecretKey: 'JWT_SECRET_KEY',
  nextPublicApiBaseUrl: 'NEXT_PUBLIC_API_BASE_URL',
  nodeEnv: 'NODE_ENV',
  port: 'PORT',
} as const;

// Make sure all required environment variables are set
for (const key of Object.values(keys)) {
  if (!process.env[key]) {
    throw new Error(`${key} is required`);
  }
}

// Environment variables with defaults
export const config = {
  jwtAuthTokenExpiresIn:
    (process.env.JWT_AUTH_TOKEN_EXPIRES_IN as string) || '2h',
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  nodeEnv: process.env.NODE_ENV as 'development' | 'production' | 'test',
  port: parseInt(process.env.PORT as string),
} as const;
