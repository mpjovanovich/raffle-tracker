import { config } from '@raffle-tracker/config';
import { AuthenticatedUser, ResetUserRequest } from '@raffle-tracker/dto';
import * as jose from 'jose';

export const TOKEN_TYPE = {
  AUTH: 'AUTH',
  VERIFY: 'VERIFY',
} as const;

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

export const printConfig = () => {
  // Just printing whatever to test...
  console.error(config.apiPort);
};

export const getExpiresInSeconds = (type: TokenType): number => {
  switch (type) {
    case TOKEN_TYPE.AUTH:
      return config.jwtAuthTokenExpiresInSeconds;
    case TOKEN_TYPE.VERIFY:
      return config.jwtVerifyTokenExpiresInSeconds;
    default:
      throw new Error('Invalid token type');
  }
};

export const getExpiresInString = (type: TokenType): string => {
  const expiresInSeconds = getExpiresInSeconds(type);
  const expiresInMinutes = expiresInSeconds / 60;
  if (expiresInMinutes < 60) {
    return `${expiresInMinutes}m`;
  }

  const expiresInHours = expiresInMinutes / 60;
  if (expiresInHours < 24) {
    return `${expiresInHours.toFixed(2)}h`;
  }

  const expiresInDays = expiresInHours / 24;
  return `${expiresInDays.toFixed(2)}d`;
};

export const decodeAuthToken = async (
  token: string
): Promise<AuthenticatedUser> => {
  return jose.decodeJwt(token) as AuthenticatedUser;
};

export const generateAuthToken = async (
  userData: AuthenticatedUser,
  type: TokenType
): Promise<string> => {
  const secret = new TextEncoder().encode(config.jwtSecretKey);
  const expiresInMilliseconds = getExpiresInSeconds(type) * 1000;

  return await new jose.SignJWT(userData as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(new Date(Date.now() + expiresInMilliseconds))
    .sign(secret);
};

export const generateTokenId = async (): Promise<string> => {
  return crypto.randomUUID();
};

// This is used for both initial verification and password reset.
export const generateResetToken = async (
  resetUserRequest: ResetUserRequest,
  type: TokenType
): Promise<string> => {
  const secret = new TextEncoder().encode(config.jwtSecretKey);
  const expiresInMilliseconds = getExpiresInSeconds(type) * 1000;

  return await new jose.SignJWT(resetUserRequest as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(new Date(Date.now() + expiresInMilliseconds))
    .sign(secret);
};

export const verifyAuthToken = async (
  token: string
): Promise<AuthenticatedUser> => {
  try {
    const secret = new TextEncoder().encode(config.jwtSecretKey);
    const { payload } = await jose.jwtVerify(token, secret);

    const user: AuthenticatedUser = {
      id: payload.id as number,
      username: payload.username as string,
      roles: payload.roles as any,
    };

    return user;
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      throw new Error('Token expired.');
    }
    throw new Error('Invalid token');
  }
};

export const verifyResetToken = async (
  token: string
): Promise<ResetUserRequest> => {
  try {
    const secret = new TextEncoder().encode(config.jwtSecretKey);
    const { payload } = await jose.jwtVerify(token, secret);

    const resetRequest: ResetUserRequest = {
      userId: payload.userId as number,
      token: payload.token as string,
    };

    return resetRequest;
  } catch (error) {
    if (error instanceof jose.errors.JWTExpired) {
      throw new Error('Token expired.');
    }
    throw new Error('Invalid token');
  }
};
