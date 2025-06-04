import { getEvents } from '@/services/eventService';
import EventsPage from './components/EventsPage';

export default async function Page() {
  const events = await getEvents();

  return <EventsPage events={events} />;
}
