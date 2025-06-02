import EventsPage from './components/EventsPage';
import { getEvents } from '@/services/events';

export default async function Page() {
  const events = await getEvents();

  return <EventsPage events={events} />;
}
