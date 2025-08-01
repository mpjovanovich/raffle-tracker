'use server';

import { config } from '@raffle-tracker/config';
import { UserListItem } from '@raffle-tracker/dto';
import { getAccessTokenOrRedirect } from './auth';

const API_BASE_URL = config.apiBaseUrl;

export async function getUsers(): Promise<{
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
