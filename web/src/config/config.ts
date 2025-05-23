const keys = {
  nodeEnv: 'NODE_ENV',
  port: 'PORT',
} as const;

// Make sure all required environment variables are set
for (const key of Object.values(keys)) {
  console.log(`Checking ${key}:`, process.env[key]);
  if (!process.env[key]) {
    throw new Error(`${key} is required`);
  }
}

// Environment variables with defaults
export const config = {
  nodeEnv: process.env.NODE_ENV as 'development' | 'production' | 'test',
  port: parseInt(process.env.PORT as string),
} as const;
