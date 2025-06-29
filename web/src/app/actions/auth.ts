'use server';

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

const getAuthUserOrRedirect = async (
  accessToken: string
): Promise<AuthenticatedUser> => {
  try {
    return await verifyAuthToken(accessToken);
  } catch (error) {
    if (error instanceof Error && error.message === 'Token expired.') {
      redirect('/login?message=Login session expired. Please log in again.');
    }
    throw error;
  }
};

export async function checkAuth(
  requiredRoles?: string[]
): Promise<AuthenticatedUser> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    redirect('/login');
  }

  const user = await getAuthUserOrRedirect(accessToken);
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
  const user = await getAuthUserOrRedirect(accessToken);
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

export async function resetPasswordAction(
  token: string,
  password: string
): Promise<void> {
  try {
    // Verify the token is still valid. It may have expired.
    await verifyResetToken(token);
  } catch (error) {
    if (error instanceof Error && error.message === 'Token expired.') {
      throw new Error(
        'Token expired. Please request a new password reset from the login page.'
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

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to reset password');
  }

  redirect(
    '/login?message=Password reset successful. Please log in with your new credentials.'
  );
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
