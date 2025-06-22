'use client';

import {
  CreateTicketsRequest,
  CreateTicketsResponse,
} from '@raffle-tracker/dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createTickets(
  requests: CreateTicketsRequest[]
): Promise<CreateTicketsResponse[]> {
  // This is one of the few API calls that takes place on the client rather than
  // the server, so we have to set the auth token manually rather than using
  // server middleware.
  const accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Not authenticated. Please log in.');
  }

  const res = await fetch(`${API_BASE_URL}/tickets`, {
    method: 'POST',
    body: JSON.stringify(requests),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create tickets');
  }

  const data = await res.json();
  return data.data as CreateTicketsResponse[];
}
