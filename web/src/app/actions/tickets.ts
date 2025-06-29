'use server';

import { getAccessTokenOrRedirect } from '@/app/actions/auth';
import { config } from '@raffle-tracker/config';
import {
  CreateTicketsRequest,
  CreateTicketsResponse,
} from '@raffle-tracker/dto';

const API_BASE_URL = config.apiBaseUrl;

export async function createTicketsAction(
  tickets: CreateTicketsRequest[]
): Promise<CreateTicketsResponse[]> {
  const token = await getAccessTokenOrRedirect();

  const res = await fetch(`${API_BASE_URL}/tickets`, {
    method: 'POST',
    body: JSON.stringify(tickets),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update order');
  }

  const data = await res.json();
  return data.data as CreateTicketsResponse[];
}
