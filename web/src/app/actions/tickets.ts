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
): Promise<{
  success: boolean;
  data?: CreateTicketsResponse[];
  error?: string;
}> {
  try {
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
      return {
        success: false,
        error: errorData.message || 'Failed to create tickets',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data: data.data as CreateTicketsResponse[],
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to create tickets',
    };
  }
}
