import {
  CreateTicketsRequest,
  CreateTicketsResponse,
} from '@raffle-tracker/dto';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createTickets(
  requests: CreateTicketsRequest[]
): Promise<CreateTicketsResponse[]> {
  const res = await fetch(`${API_BASE_URL}/tickets`, {
    method: 'POST',
    body: JSON.stringify(requests),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create tickets');
  }

  const data = await res.json();
  return data.data as CreateTicketsResponse[];
}
