import { getAccessToken } from '@/utils/authUtility';
import { Event } from '@raffle-tracker/dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getEvents(): Promise<Event[]> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

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

export async function getEvent(
  id: number,
  includeChildren: boolean
): Promise<Event> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

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

export async function upsertEvent(event: Event): Promise<Event> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

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
