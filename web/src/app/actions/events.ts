'use server';

import { getAccessTokenOrRedirect } from '@/app/actions/auth';
import { config } from '@raffle-tracker/config';
import { Event } from '@raffle-tracker/dto';

const API_BASE_URL = config.apiBaseUrl;

export async function getEventsAction(): Promise<{
  success: boolean;
  data?: Event[];
  error?: string;
}> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(`${API_BASE_URL}/events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch events',
      };
    }

    const data = await res.json();

    // Sort desc - most recent first
    const sortedData = data.data.sort(
      (a: Event, b: Event) => b.id - a.id
    ) as Event[];
    return {
      success: true,
      data: sortedData,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch events',
    };
  }
}

export async function getEventAction(
  id: number,
  includeChildren: boolean
): Promise<{ success: boolean; data?: Event; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(
      `${API_BASE_URL}/events/${id}/?includeChildren=${includeChildren ? 'true' : 'false'}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch event',
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
      error: error instanceof Error ? error.message : 'Failed to fetch event',
    };
  }
}

export async function upsertEventAction(
  event: Event
): Promise<{ success: boolean; data?: Event; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const url =
      event.id === 0
        ? `${API_BASE_URL}/events`
        : `${API_BASE_URL}/events/${event.id}`;

    const res = await fetch(url, {
      method: event.id === 0 ? 'POST' : 'PUT',
      body: JSON.stringify(event),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to save event',
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
      error: error instanceof Error ? error.message : 'Failed to save event',
    };
  }
}
