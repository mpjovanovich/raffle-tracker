'use server';

import { getAccessTokenOrRedirect } from '@/app/actions/auth';
import { config } from '@raffle-tracker/config';
import { Event } from '@raffle-tracker/dto';

const API_BASE_URL = config.apiBaseUrl;

export async function getEventsAction(): Promise<Event[]> {
  const token = await getAccessTokenOrRedirect();

  const res = await fetch(`${API_BASE_URL}/events`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch events');
  }

  const data = await res.json();

  // Sort desc - most recent first
  return data.data.sort((a: Event, b: Event) => b.id - a.id) as Event[];
}

export async function getEventAction(
  id: number,
  includeChildren: boolean
): Promise<Event> {
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
    throw new Error(errorData.message || 'Failed to fetch event');
  }

  const data = await res.json();
  return data.data as Event;
}

export async function upsertEventAction(event: Event): Promise<Event> {
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
    throw new Error(errorData.message || 'Failed to save event');
  }

  const data = await res.json();
  return data.data as Event;
}
