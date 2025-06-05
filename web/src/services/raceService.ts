import { CreateRaceRequest, Event, Race } from '@horse-race-raffle-tracker/dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addRace(
  eventId: number,
  raceNumber: number,
  numberOfHorses: number
) {
  const createRaceRequest: CreateRaceRequest = {
    eventId,
    raceNumber,
    numberOfHorses,
  };
  const res = await fetch(`${API_BASE_URL}/races`, {
    method: 'POST',
    body: JSON.stringify(createRaceRequest),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to add race');
  }

  const data = await res.json();
  return data.data as Event;
}

export async function deleteRace(id: number) {
  const res = await fetch(`${API_BASE_URL}/races/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to delete race');
  }
}

export async function getRace(id: number, includeChildren: boolean) {
  const res = await fetch(
    `${API_BASE_URL}/races/${id}${includeChildren ? '?includeChildren=true' : ''}`
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch race');
  }

  const data = await res.json();
  return data.data as Race;
}
