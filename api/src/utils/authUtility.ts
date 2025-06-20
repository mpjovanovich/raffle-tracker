import { config } from '@/config/config.js';
import { TOKEN_TYPE, TokenType } from '@/types/TokenType.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export interface TokenPayload {
  userId: string;
}

const getExpiresIn = (type: TokenType): jwt.SignOptions['expiresIn'] => {
  switch (type) {
    case TOKEN_TYPE.AUTH:
      return config.jwtAuthTokenExpiresIn as jwt.SignOptions['expiresIn'];
    case TOKEN_TYPE.REFRESH:
      return config.jwtRefreshTokenExpiresIn as jwt.SignOptions['expiresIn'];
    case TOKEN_TYPE.VERIFY:
      return config.jwtVerifyTokenExpiresIn as jwt.SignOptions['expiresIn'];
    case TOKEN_TYPE.TEMP:
      return config.jwtTempTokenExpiresIn as jwt.SignOptions['expiresIn'];
    default:
      throw new Error('Invalid token type');
  }
};

export const decodeToken = async (token: string): Promise<TokenPayload> => {
  return jwt.decode(token) as TokenPayload;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateToken = async (
  userId: number,
  type: TokenType
): Promise<string> => {
  const data = {
    userId: userId.toString(),
  };
  return jwt.sign(data, config.jwtSecretKey as jwt.Secret, {
    expiresIn: getExpiresIn(type),
  });
};

export const verifyToken = async (token: string): Promise<TokenPayload> => {
  try {
    return jwt.verify(token, config.jwtSecretKey as jwt.Secret) as TokenPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Authentication expired. Please login again.');
    }
    throw new Error('Invalid token');
  }
};
