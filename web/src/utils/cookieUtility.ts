import {
  generateAuthToken,
  TOKEN_TYPE,
  verifyAuthToken,
} from '@raffle-tracker/auth';
import { AuthenticatedUser, ROLE } from '@raffle-tracker/dto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const refreshToken = async (user: AuthenticatedUser): Promise<void> => {
  const newToken = await generateAuthToken(user, TOKEN_TYPE.AUTH);
  await setAccessTokenCookie(newToken);
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

  const user = await verifyAuthToken(accessToken);
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

  await refreshToken(user);

  return user;
}

export async function setAccessTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 2 * 60 * 60, // Two hours
    // TODO: get config to match api?
  });
}
