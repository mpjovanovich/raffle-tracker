import EventPage from '@/components/page/events/EventPage';
import { Event } from '@raffle-tracker/dto';

export default async function Page() {
  const new_event: Event = {
    id: 0,
    name: '',
    location: '',
    startDate: '',
    endDate: '',
    closed: 0,
  };
  return (
    <EventPage
      event={new_event}
      mode="create"
    />
  );
}
