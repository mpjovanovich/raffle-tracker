import { config } from '@/config/config';
import { AuthenticatedUser, User } from '@raffle-tracker/dto';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');

    if (!userCookie) {
      return null;
    }

    return JSON.parse(userCookie.value) as User;
  } catch {
    return null;
  }
}

export async function getAccessToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('accessToken');
    return tokenCookie?.value || null;
  } catch {
    return null;
  }
}

export const verifyToken = async (
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
