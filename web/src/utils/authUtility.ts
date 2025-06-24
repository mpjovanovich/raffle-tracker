import { config } from '@/config/config';
import { AuthenticatedUser, ROLE } from '@raffle-tracker/dto';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const verifyToken = async (token: string): Promise<AuthenticatedUser> => {
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
  const accessToken = await getAccessToken();
  if (!accessToken) {
    redirect('/login');
  }

  const user = await verifyToken(accessToken);
  if (!user.roles || user.roles.length === 0) {
    // TODO: Logging
    // User should never be in this state - someone needs to assign a role to the user.
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
