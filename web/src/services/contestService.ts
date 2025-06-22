import { getAccessToken } from '@/utils/authUtility';
import { Contest, CreateContestRequest, Event } from '@raffle-tracker/dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function addContest(
  eventId: number,
  contestNumber: number,
  numberOfHorses: number
): Promise<Event> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

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
    throw new Error(errorData.message || 'Failed to add contest');
  }

  const data = await res.json();
  return data.data as Event;
}

export async function deleteContest(id: number): Promise<void> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(`${API_BASE_URL}/contests/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to delete contest');
  }
}

export async function getContest(
  id: number,
  includeChildren: boolean
): Promise<Contest> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(
    `${API_BASE_URL}/contests/${id}${includeChildren ? '?includeChildren=true' : ''}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch contest');
  }

  const data = await res.json();
  return data.data as Contest;
}

export async function getValidContestsByEvent(
  eventId: number
): Promise<Contest[]> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }

  const res = await fetch(`${API_BASE_URL}/events/${eventId}/races`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch contests');
  }

  const data = await res.json();
  return data.data as Contest[];
}
