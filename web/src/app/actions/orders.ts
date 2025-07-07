'use server';

import { getAccessTokenOrRedirect } from '@/app/actions/auth';
import { config } from '@raffle-tracker/config';
import { OrderStatus, UpdateOrderResponse } from '@raffle-tracker/dto';

const API_BASE_URL = config.apiBaseUrl;

export async function updateOrderAction(
  orderId: number,
  status: OrderStatus
): Promise<{ success: boolean; data?: UpdateOrderResponse; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to update order',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data: data.data as UpdateOrderResponse,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update order',
    };
  }
}
