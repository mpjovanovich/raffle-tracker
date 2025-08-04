'use server';

import { config } from '@raffle-tracker/config';
import { User, UserListItem } from '@raffle-tracker/dto';
import { getAccessTokenOrRedirect } from './auth';

const API_BASE_URL = config.apiBaseUrl;

export async function getUserAction(
  id: number
): Promise<{ success: boolean; data?: User; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch user',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data: data.data as User,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch user',
    };
  }
}

export async function getUsersAction(): Promise<{
  success: boolean;
  data?: UserListItem[];
  error?: string;
}> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch users',
      };
    }

    const data = await res.json();

    const sortedData = data.data.sort((a: UserListItem, b: UserListItem) =>
      a.username.localeCompare(b.username)
    ) as UserListItem[];
    return {
      success: true,
      data: sortedData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch users',
    };
  }
}

export async function upsertUserAction(
  user: User
): Promise<{ success: boolean; data?: User; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const url =
      user.id === 0
        ? `${API_BASE_URL}/users`
        : `${API_BASE_URL}/users/${user.id}`;

    const res = await fetch(url, {
      method: user.id === 0 ? 'POST' : 'PUT',
      body: JSON.stringify(user),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to save user',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data: data.data as User,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to save user',
    };
  }
}
