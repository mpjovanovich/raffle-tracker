import { Event } from '@horse-race-raffle-tracker/dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getEvents() {
  const res = await fetch(`${API_BASE_URL}/events`);
  if (!res.ok) {
    throw new Error('Failed to fetch events');
  }

  const data = await res.json();
  return data.data as Event[];
}

export async function getEvent(id: number, includeChildren: boolean) {
  const res = await fetch(
    `${API_BASE_URL}/events/${id}${includeChildren ? '?includeChildren=true' : ''}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch event');
  }

  const data = await res.json();
  return data.data as Event;
}

export async function upsertEvent(event: Event) {
  const url =
    event.id === 0
      ? `${API_BASE_URL}/events`
      : `${API_BASE_URL}/events/${event.id}`;

  const res = await fetch(url, {
    method: event.id === 0 ? 'POST' : 'PUT',
    body: JSON.stringify(event),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to save event');
  }

  const data = await res.json();
  return data.data as Event;
}
