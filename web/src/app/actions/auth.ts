'use server';

import { COOKIE_NAMES } from '@/constants/constants';
import { verifyAuthToken, verifyResetToken } from '@raffle-tracker/auth';
import { config } from '@raffle-tracker/config';
import {
  AuthenticatedUser,
  LoginResponse,
  ResetPasswordRequest,
  ROLE,
  SignupRequest,
} from '@raffle-tracker/dto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE_URL = config.apiBaseUrl;

const getAccessToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN);
    return tokenCookie?.value || null;
  } catch {
    return null;
  }
};

export const getAuthUser = async (): Promise<AuthenticatedUser> => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new Error('No access token found');
  }
  return await verifyAuthToken(accessToken);
};

// DEPRECATED
const getAuthUserOrRedirect = async (
  accessToken: string
): Promise<AuthenticatedUser> => {
  try {
    return await verifyAuthToken(accessToken);
  } catch (error) {
    // This function is only ever called on the server side. Middleware should intercept any expired access tokens,
    // so this is one last sanity check that will boot the user to login if it gets past middleware.
    if (error instanceof Error && error.message === 'Token expired.') {
      redirect('/login?message=Login session expired. Please log in again.');
    }
    throw error;
  }
};

// DEPRECATED - use middleware instead
export async function checkAuth(
  requiredRoles?: string[]
): Promise<AuthenticatedUser> {
  const accessToken = await getAccessTokenOrRedirect();
  const user = await getAuthUserOrRedirect(accessToken);
  if (!user.roles || user.roles.length === 0) {
    // TODO: Logging
    // User should never be in this state - someone needs to assign a role to the user.
    // User should at least have the VIEWER role.
    redirect(
      '/login?message=User has no roles. Please contact an administrator.'
    );
  }

  if (
    // Admins can access all pages
    !user.roles.includes(ROLE.ADMIN) &&
    // User only needs to have one of the required roles if any are defined
    requiredRoles &&
    !requiredRoles.some(role => user.roles?.some(userRole => userRole === role))
  ) {
    // If anyone tries to hit a page they don't have access to, redirect to the root page.
    // The root page (currently events) needs to allow VIEWER or this will loop endlessly!
    redirect('/');
  }

  return user;
}

export async function getAccessTokenOrRedirect(): Promise<string> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    // This function is only ever called on the server side. Middleware should intercept any expired access tokens,
    // so this is one last sanity check that will boot the user to login if it gets past middleware.
    redirect('/login');
  }
  return accessToken;
}

// This is the "client side version" of getAccessTokenOrRedirect.
export async function isLoggedIn(): Promise<boolean> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
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
  await setLoggedInCookie();
  redirect('/');
}

export async function logoutAction(): Promise<void> {
  await removeAccessTokenCookie();
  await removeLoggedInCookie();
  redirect('/login');
}

export async function removeAccessTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, '', {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: 0,
  });
}

export async function removeLoggedInCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.LOGGED_IN, '', {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: 0,
  });
}

export async function resetPasswordAction(
  token: string,
  password: string
): Promise<void> {
  try {
    // Verify the token is still valid. It may have expired.
    await verifyResetToken(token);
  } catch (error) {
    if (error instanceof Error && error.message === 'Token expired.') {
      redirect(
        '/login?message=Token expired. Please request a new password reset.'
      );
    }
  }

  const request: ResetPasswordRequest = { token, password };
  const res = await fetch(`${API_BASE_URL}/auth/resetPassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to reset password');
  }

  redirect(`/login?message=${data.message}`);
}

export async function setAccessTokenCookie(token: string): Promise<void> {
  // Can't use config object here because Next.js doesn't support it.
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: config.jwtAuthTokenExpiresIn,
  });
}

export async function setLoggedInCookie(): Promise<void> {
  // This cookie isn't used for security. It's used to tell if the user was previously logged in,
  // and no longer has an unexpired access token cookie.
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.LOGGED_IN, 'true', {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: config.jwtAuthTokenExpiresIn + 60 * 60 * 24, // 24 hours after the auth token expires
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

  redirect(`/login?message=${data.message}`);
}
