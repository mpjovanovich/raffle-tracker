'use server';

import {
  removeAccessTokenCookie,
  setAccessTokenCookie,
} from '@/utils/cookieUtility';
import { config } from '@raffle-tracker/config';
import { LoginResponse } from '@raffle-tracker/dto';

const API_BASE_URL = config.apiBaseUrl;

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
}

export async function logoutAction(): Promise<void> {
  await removeAccessTokenCookie();
}
