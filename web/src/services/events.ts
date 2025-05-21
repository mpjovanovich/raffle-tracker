import { Event } from '@horse-race-raffle-tracker/dto';
import { API_BASE_URL } from '@/config/constants';

export async function getEvents() {
  return fetch(`${API_BASE_URL}/events`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      return res.json();
    })
    .then(data => JSON.parse(data.data) as Event[]);
}

export async function getEvent(id: number) {
  return fetch(`${API_BASE_URL}/events/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch event');
      }
      return res.json();
    })
    .then(data => JSON.parse(data.data) as Event);
}
