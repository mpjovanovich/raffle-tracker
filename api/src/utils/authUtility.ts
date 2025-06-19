import { config } from '@/config/config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const getExpiresIn = (type: string): jwt.SignOptions['expiresIn'] => {
  switch (type) {
    case 'auth':
      return config.jwtAuthTokenExpiresIn as jwt.SignOptions['expiresIn'];
    case 'refresh':
      return config.jwtRefreshTokenExpiresIn as jwt.SignOptions['expiresIn'];
    case 'verify':
      return config.jwtVerifyTokenExpiresIn as jwt.SignOptions['expiresIn'];
    case 'temp':
      return config.jwtTempTokenExpiresIn as jwt.SignOptions['expiresIn'];
    default:
      throw new Error('Invalid token type');
  }
};

export const decodeToken = async (token: string): Promise<any> => {
  return jwt.decode(token);
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
  type: string
): Promise<string> => {
  const data = {
    userId: userId.toString(),
  };
  return jwt.sign(data, config.jwtSecretKey as jwt.Secret, {
    expiresIn: getExpiresIn(type),
  });
};

export const verifyToken = async (token: string): Promise<any> => {
  try {
    return jwt.verify(token, config.jwtSecretKey as jwt.Secret);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Authentication expired. Please login again.');
    }
    throw new Error('Invalid token');
  }
};
