'use server';

import { getAccessTokenOrRedirect } from '@/app/actions/auth';
import { config } from '@raffle-tracker/config';
import { CreateHorseRequest, Horse } from '@raffle-tracker/dto';

const API_BASE_URL = config.apiBaseUrl;

export async function addHorseAction(
  contestId: number,
  number: number
): Promise<{ success: boolean; data?: Horse; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const createHorseRequest: CreateHorseRequest = {
      contestId,
      number,
    };
    const res = await fetch(`${API_BASE_URL}/horses`, {
      method: 'POST',
      body: JSON.stringify(createHorseRequest),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to add horse',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data: data.data as Horse,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add horse',
    };
  }
}

export async function deleteHorseAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(`${API_BASE_URL}/horses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to delete horse',
      };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete horse',
    };
  }
}

export async function toggleScratchAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(`${API_BASE_URL}/horses/${id}/toggleScratch`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to toggle scratch',
      };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to toggle scratch',
    };
  }
}

export async function toggleWinnerAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(`${API_BASE_URL}/horses/${id}/toggleWinner`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to toggle winner',
      };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to toggle winner',
    };
  }
}
