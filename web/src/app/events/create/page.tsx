import EventPage from '../components/EventPage';
import { Event } from '@horse-race-raffle-tracker/dto';

export default async function Page() {
  const new_event: Event = {
    id: 0,
    name: '',
    location: '',
    startDate: new Date(),
    endDate: new Date(),
  };
  return (
    <EventPage
      event={new_event}
      mode="create"
    />
  );
}
