'use server';

import { getAccessTokenOrRedirect } from '@/app/actions/auth';
import { config } from '@raffle-tracker/config';
import { Contest, CreateContestRequest, Event } from '@raffle-tracker/dto';

const API_BASE_URL = config.apiBaseUrl;

export async function addContestAction(
  eventId: number,
  contestNumber: number,
  numberOfHorses: number
): Promise<{ success: boolean; data?: Event; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const createContestRequest: CreateContestRequest = {
      eventId,
      contestNumber,
      numberOfHorses,
    };
    const res = await fetch(`${API_BASE_URL}/contests`, {
      method: 'POST',
      body: JSON.stringify(createContestRequest),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to add contest',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data: data.data as Event,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to add contest',
    };
  }
}

export async function deleteContestAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(`${API_BASE_URL}/contests/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to delete contest',
      };
    }
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to delete contest',
    };
  }
}

export async function getContestAction(
  id: number,
  includeChildren: boolean
): Promise<{ success: boolean; data?: Contest; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(
      `${API_BASE_URL}/contests/${id}${includeChildren ? '?includeChildren=true' : ''}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch contest',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data: data.data as Contest,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch contest',
    };
  }
}

export async function getValidContestsByEventAction(
  eventId: number
): Promise<{ success: boolean; data?: Contest[]; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(`${API_BASE_URL}/events/${eventId}/races`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch contests',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data: data.data as Contest[],
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch contests',
    };
  }
}
