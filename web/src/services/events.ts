import { Event } from '@horse-race-raffle-tracker/dto';

export async function getEvents() {
  return fetch('http://localhost:3001/api/events')
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      return res.json();
    })
    .then(data => JSON.parse(data.data) as Event[]);
}
