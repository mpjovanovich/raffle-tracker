'use server';

import { getAccessTokenOrRedirect } from '@/app/actions/auth';
import { config } from '@raffle-tracker/config';
import { EventSalesReport } from '@raffle-tracker/dto';

const API_BASE_URL = config.apiBaseUrl;

export async function getEventSalesReportAction(
  id: number
): Promise<{ success: boolean; data?: EventSalesReport; error?: string }> {
  try {
    const token = await getAccessTokenOrRedirect();

    const res = await fetch(`${API_BASE_URL}/reports/eventSalesReport/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error: errorData.message || 'Failed to fetch event',
      };
    }

    const data = await res.json();
    return {
      success: true,
      data: data.data as EventSalesReport,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch event',
    };
  }
}
