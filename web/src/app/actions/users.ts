'use server';

import { config } from '@raffle-tracker/config';
import { RoleListItem, User, UserListItem } from '@raffle-tracker/dto';
import { getAccessTokenOrRedirect } from './auth';

const API_BASE_URL = config.apiBaseUrl;

export async function createUserAction(
  username: string,
  password: string
): Promise<{ success: boolean; data?: User; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const url = `${API_BASE_URL}/users`;

    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to create user',
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
      error: error instanceof Error ? error.message : 'Failed to create user',
    };
  }
}

export async function getRolesAction(): Promise<{
  success: boolean;
  data?: RoleListItem[];
  error?: string;
}> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(`${API_BASE_URL}/users/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch roles',
      };
    }

    const data = await res.json();

    const sortedData = data.data.sort((a: RoleListItem, b: RoleListItem) =>
      a.name.localeCompare(b.name)
    ) as RoleListItem[];
    return {
      success: true,
      data: sortedData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch roles',
    };
  }
}

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

export async function toggleRoleAction(
  userId: number,
  roleId: number
): Promise<{ success: boolean; data?: User; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const url = `${API_BASE_URL}/users/${userId}/roles/${roleId}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to toggle role',
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
      error: error instanceof Error ? error.message : 'Failed to toggle role',
    };
  }
}

export async function updatePasswordAction(
  userId: number,
  password: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const url = `${API_BASE_URL}/users/${userId}/password`;

    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify({ password }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to update password',
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to update password',
    };
  }
}

export async function updateUserAction(
  user: User
): Promise<{ success: boolean; data?: User; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const url = `${API_BASE_URL}/users/${user.id}`;

    const res = await fetch(url, {
      method: 'PUT',
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
