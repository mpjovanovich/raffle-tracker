import { CreateHorseRequest, Horse } from '@horse-race-raffle-tracker/dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addHorse(raceId: number, number: number) {
  const createHorseRequest: CreateHorseRequest = {
    raceId,
    number,
  };
  const res = await fetch(`${API_BASE_URL}/horses`, {
    method: 'POST',
    body: JSON.stringify(createHorseRequest),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to add horse');
  }

  const data = await res.json();
  return data.data as Horse;
}

export async function deleteHorse(id: number) {
  const res = await fetch(`${API_BASE_URL}/horses/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Failed to delete horse');
  }
}

export async function toggleScratch(id: number) {
  const res = await fetch(`${API_BASE_URL}/horses/${id}/toggleScratch`, {
    method: 'PATCH',
  });
  if (!res.ok) {
    throw new Error('Failed to toggle scratch');
  }
}

export async function toggleWinner(id: number) {
  const res = await fetch(`${API_BASE_URL}/horses/${id}/toggleWinner`, {
    method: 'PATCH',
  });
  if (!res.ok) {
    throw new Error('Failed to toggle winner');
  }
}
