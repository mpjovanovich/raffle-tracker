'use server';

import { COOKIE_NAMES } from '@/constants/constants';
import { verifyAuthToken, verifyResetToken } from '@raffle-tracker/auth';
import { config } from '@raffle-tracker/config';
import {
  AuthenticatedUser,
  LoginResponse,
  ResetPasswordRequest,
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
): Promise<{ success: boolean; error?: string }> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    return {
      success: false,
      error: errorData.message || 'Failed to login',
    };
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
): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    // Verify the token is still valid. It may have expired.
    await verifyResetToken(token);
  } catch (error) {
    if (error instanceof Error && error.message === 'Token expired.') {
      return {
        success: false,
        error: 'Token expired. Please request a new password reset.',
      };
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
    return {
      success: false,
      error: data.message || 'Failed to reset password',
    };
  }

  return {
    success: true,
    message: data.message,
  };
}

export async function setAccessTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, token, {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: config.jwtAuthTokenExpiresInSeconds,
  });
}

export async function setLoggedInCookie(): Promise<void> {
  // This cookie isn't used for security. It's used to tell if the user was previously logged in,
  // and no longer has an unexpired access token cookie.
  const oneDayInSeconds = 24 * 60 * 60;

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAMES.LOGGED_IN, 'true', {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    sameSite: 'lax',
    maxAge: oneDayInSeconds + config.jwtAuthTokenExpiresInSeconds,
  });
}

export async function signupAction(
  email: string,
  username: string
): Promise<{ success: boolean; error?: string; message?: string }> {
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
    return {
      success: false,
      error: data.message || 'Failed to sign up',
    };
  }

  return {
    success: true,
    message: data.message,
  };
}
