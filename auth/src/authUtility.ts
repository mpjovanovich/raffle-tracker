import { config } from '@raffle-tracker/config';
import { AuthenticatedUser, ResetUserRequest } from '@raffle-tracker/dto';
import jwt from 'jsonwebtoken';

export const TOKEN_TYPE = {
  AUTH: 'AUTH',
  VERIFY: 'VERIFY',
} as const;

export type TokenType = (typeof TOKEN_TYPE)[keyof typeof TOKEN_TYPE];

export const printConfig = () => {
  // Just printing whatever to test...
  console.error(config.apiPort);
};

export const getExpiresIn = (
  type: TokenType
): { jwtExpiresIn: jwt.SignOptions['expiresIn']; expiresInSeconds: number } => {
  switch (type) {
    case TOKEN_TYPE.AUTH:
      return {
        jwtExpiresIn: config.jwtAuthTokenExpiresIn.jwtExpiresIn,
        expiresInSeconds: config.jwtAuthTokenExpiresIn.expiresInSeconds,
      };
    case TOKEN_TYPE.VERIFY:
      return {
        jwtExpiresIn: config.jwtVerifyTokenExpiresIn.jwtExpiresIn,
        expiresInSeconds: config.jwtVerifyTokenExpiresIn.expiresInSeconds,
      };
    default:
      throw new Error('Invalid token type');
  }
};

export const decodeAuthToken = async (
  token: string
): Promise<AuthenticatedUser> => {
  return jwt.decode(token) as AuthenticatedUser;
};

export const generateAuthToken = async (
  userData: AuthenticatedUser,
  type: TokenType
): Promise<string> => {
  return jwt.sign(userData, config.jwtSecretKey as jwt.Secret, {
    expiresIn: getExpiresIn(type).jwtExpiresIn,
  });
};

export const generateTokenId = async (): Promise<string> => {
  return crypto.randomUUID();
};

// This is used for both initial verification and password reset.
export const generateResetToken = async (
  resetUserRequest: ResetUserRequest,
  type: TokenType
): Promise<string> => {
  return jwt.sign(resetUserRequest, config.jwtSecretKey as jwt.Secret, {
    expiresIn: getExpiresIn(type).jwtExpiresIn,
  });
};

export const verifyAuthToken = async (
  token: string
): Promise<AuthenticatedUser> => {
  try {
    // jwt.verify returns a JWT object, with JWT metadata.
    // It conforms to the AuthenticatedUser interface but we don't want the metadata,
    // so we extract the user data from it.
    const { id, username, roles } = jwt.verify(
      token,
      config.jwtSecretKey as jwt.Secret
    ) as AuthenticatedUser;

    const user: AuthenticatedUser = { id, username, roles };

    return user;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired.');
    }
    throw new Error('Invalid token');
  }
};

export const verifyResetToken = async (
  token: string
): Promise<ResetUserRequest> => {
  try {
    return jwt.verify(
      token,
      config.jwtSecretKey as jwt.Secret
    ) as ResetUserRequest;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token expired.');
    }
    throw new Error('Invalid token');
  }
};
