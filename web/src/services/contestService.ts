import { Contest, CreateContestRequest, Event } from '@raffle-tracker/dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addContest(
  eventId: number,
  contestNumber: number,
  numberOfHorses: number
) {
  const createContestRequest: CreateContestRequest = {
    eventId,
    contestNumber,
    numberOfHorses,
  };
  const res = await fetch(`${API_BASE_URL}/contests`, {
    method: 'POST',
    body: JSON.stringify(createContestRequest),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to add contest');
  }

  const data = await res.json();
  return data.data as Event;
}

export async function deleteContest(id: number) {
  const res = await fetch(`${API_BASE_URL}/contests/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to delete contest');
  }
}

export async function getContest(id: number, includeChildren: boolean) {
  const res = await fetch(
    `${API_BASE_URL}/contests/${id}${includeChildren ? '?includeChildren=true' : ''}`
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch contest');
  }

  const data = await res.json();
  return data.data as Contest;
}
