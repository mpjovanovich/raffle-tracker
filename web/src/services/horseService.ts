// import { getAccessToken } from '@/utils/authUtility';
// import { CreateHorseRequest, Horse } from '@raffle-tracker/dto';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export async function addHorse(
//   contestId: number,
//   number: number
// ): Promise<Horse> {
//   const token = await getAccessToken();
//   if (!token) {
//     throw new Error('Not authenticated');
//   }

//   const createHorseRequest: CreateHorseRequest = {
//     contestId,
//     number,
//   };
//   const res = await fetch(`${API_BASE_URL}/horses`, {
//     method: 'POST',
//     body: JSON.stringify(createHorseRequest),
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.message || 'Failed to add horse');
//   }

//   const data = await res.json();
//   return data.data as Horse;
// }

// export async function deleteHorse(id: number): Promise<void> {
//   const token = await getAccessToken();
//   if (!token) {
//     throw new Error('Not authenticated');
//   }

//   const res = await fetch(`${API_BASE_URL}/horses/${id}`, {
//     method: 'DELETE',
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.message || 'Failed to delete horse');
//   }
// }

// export async function toggleScratch(id: number): Promise<void> {
//   const token = await getAccessToken();
//   if (!token) {
//     throw new Error('Not authenticated');
//   }

//   const res = await fetch(`${API_BASE_URL}/horses/${id}/toggleScratch`, {
//     method: 'PATCH',
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.message || 'Failed to toggle scratch');
//   }
// }

// export async function toggleWinner(id: number): Promise<void> {
//   const token = await getAccessToken();
//   if (!token) {
//     throw new Error('Not authenticated');
//   }

//   const res = await fetch(`${API_BASE_URL}/horses/${id}/toggleWinner`, {
//     method: 'PATCH',
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(errorData.message || 'Failed to toggle winner');
//   }
// }
