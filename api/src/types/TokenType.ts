export const TOKEN_TYPE = {
  AUTH: 'AUTH',
  TEMP: 'TEMP',
  VERIFY: 'VERIFY',
} as const;

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];
