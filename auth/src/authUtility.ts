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

export const getExpiresIn = (type: TokenType): number => {
  switch (type) {
    case TOKEN_TYPE.AUTH:
      return config.jwtAuthTokenExpiresIn;
    case TOKEN_TYPE.VERIFY:
      return config.jwtVerifyTokenExpiresIn;
    default:
      throw new Error('Invalid token type');
  }
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
  const expiresIn = getExpiresIn(type);

  return await new jose.SignJWT(userData as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn)
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
  const expiresIn = getExpiresIn(type);

  return await new jose.SignJWT(resetUserRequest as any)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(Math.floor(Date.now() / 1000) + expiresIn)
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
