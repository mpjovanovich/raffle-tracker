// import { getAccessToken } from '@/utils/authUtility';
// import { OrderStatus, UpdateOrderResponse } from '@raffle-tracker/dto';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export async function updateOrder(
//   orderId: number,
//   status: OrderStatus
// ): Promise<UpdateOrderResponse> {
//   const token = await getAccessToken();
//   if (!token) {
//     throw new Error('Not authenticated');
//   }

//   const res = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
//     method: 'PUT',
//     body: JSON.stringify({ status }),
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.message || 'Failed to update order');
//   }

//   const data = await res.json();
//   return data.data as UpdateOrderResponse;
// }
