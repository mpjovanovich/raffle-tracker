import { config } from '@/config/config';
import { AuthenticatedUser, ROLE } from '@raffle-tracker/dto';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken');

    if (!accessToken) {
      return null;
    }

    return verifyToken(accessToken.value);
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

export async function requireAuth(
  requiredRoles?: string[]
): Promise<AuthenticatedUser> {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }
  if (!user.roles || user.roles.length === 0) {
    redirect('/login');
  }

  // Admins can access all pages
  if (user.roles.includes(ROLE.ADMIN)) {
    return user;
  }

  // User only needs to have one of the required roles
  if (
    requiredRoles &&
    !requiredRoles.some(role => user.roles?.some(userRole => userRole === role))
  ) {
    redirect('/');
  }

  return user;
}

export const verifyToken = async (
  token: string
): Promise<AuthenticatedUser> => {
  try {
    console.log('verifying token', token);
    console.log('using secret key:', config.jwtSecretKey);

    // First, let's decode the token without verification to see its structure
    const decoded = jwt.decode(token);
    console.log('decoded token (without verification):', decoded);

    // Let's also check if the token is malformed
    const parts = token.split('.');
    console.log('token parts count:', parts.length);
    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    return jwt.verify(
      token,
      config.jwtSecretKey as jwt.Secret
    ) as AuthenticatedUser;
  } catch (error) {
    console.error('JWT verification error:', error);

    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Authentication expired. Please login again.');
    }
    throw new Error('Invalid token');
  }
};
