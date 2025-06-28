'use server';

import { verifyAuthToken } from '@raffle-tracker/auth';
import { config } from '@raffle-tracker/config';
import {
  AuthenticatedUser,
  LoginResponse,
  ROLE,
  SignupRequest,
} from '@raffle-tracker/dto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE_URL = config.apiBaseUrl;

export async function checkAuth(
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

  if (
    // Admins can access all pages
    !user.roles.includes(ROLE.ADMIN) &&
    // User only needs to have one of the required roles if any are defined
    requiredRoles &&
    !requiredRoles.some(role => user.roles?.some(userRole => userRole === role))
  ) {
    redirect('/');
  }

  return user;
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

export async function isLoggedIn(): Promise<boolean> {
  // If no token at all, they are not logged in.
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return false;
  }

  // If the token is invalid, they are not logged in.
  const user = await verifyAuthToken(accessToken);
  if (!user.roles || user.roles.length === 0) {
    return false;
  }

  return true;
}

export async function loginAction(
  username: string,
  password: string
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to login');
  }

  const data = await res.json();
  const loginResponse = data.data as LoginResponse;
  await setAccessTokenCookie(loginResponse.accessToken);
  redirect('/');
}

export async function logoutAction(): Promise<void> {
  await removeAccessTokenCookie();
}

export async function removeAccessTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('accessToken', '', {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: 0,
  });
}

export async function setAccessTokenCookie(token: string): Promise<void> {
  // Can't use config object here because Next.js doesn't support it.
  const cookieStore = await cookies();
  cookieStore.set('accessToken', token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: config.jwtAuthTokenExpiresIn.expiresInSeconds,
  });
}

export async function signupAction(
  email: string,
  username: string
): Promise<string> {
  const signupRequest: SignupRequest = {
    email,
    username,
    validateUrl: `${config.webBaseUrl}/resetPassword`,
  };
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupRequest),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Failed to sign up');
  }

  return data.message;
}
