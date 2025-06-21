import EventsPage from '@/components/page/events/EventsPage';
import { getEvents } from '@/services/eventService';

export default async function Page() {
  const events = await getEvents();

  return <EventsPage events={events} />;
}
