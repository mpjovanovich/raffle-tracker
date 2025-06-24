import { config } from '@/config/config.js';
import { ResetUserRequest } from '@/types/ResetUserRequest.js';
import { TOKEN_TYPE, TokenType } from '@/types/TokenType.js';
import { AuthenticatedUser } from '@raffle-tracker/dto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getExpiresIn = (type: TokenType): jwt.SignOptions['expiresIn'] => {
  switch (type) {
    case TOKEN_TYPE.AUTH:
      return config.jwtAuthTokenExpiresIn as jwt.SignOptions['expiresIn'];
    case TOKEN_TYPE.VERIFY:
      return config.jwtVerifyTokenExpiresIn as jwt.SignOptions['expiresIn'];
    default:
      throw new Error('Invalid token type');
  }
};

export const decodeToken = async (
  token: string
): Promise<AuthenticatedUser> => {
  return jwt.decode(token) as AuthenticatedUser;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const generateTokenId = async (): Promise<string> => {
  return crypto.randomUUID();
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateAuthToken = async (
  userData: AuthenticatedUser,
  type: TokenType
): Promise<string> => {
  return jwt.sign(userData, config.jwtSecretKey as jwt.Secret, {
    expiresIn: getExpiresIn(type),
  });
};

// This is used for both initial verification and password reset.
export const generateResetToken = async (
  resetUserRequest: ResetUserRequest,
  type: TokenType
): Promise<string> => {
  return jwt.sign(resetUserRequest, config.jwtSecretKey as jwt.Secret, {
    expiresIn: getExpiresIn(type),
  });
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
      throw new Error('Authentication expired. Please login again.');
    }
    throw new Error('Invalid token');
  }
};

export const verifyAuthToken = async (
  token: string
): Promise<AuthenticatedUser> => {
  try {
    return jwt.verify(
      token,
      config.jwtSecretKey as jwt.Secret
    ) as AuthenticatedUser;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Authentication expired. Please login again.');
    }
    throw new Error('Invalid token');
  }
};
