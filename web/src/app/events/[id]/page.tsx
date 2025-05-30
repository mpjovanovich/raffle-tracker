import EventPage from '../components/EventPage';
import { getEvent } from '@/services/events';

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const event_id = parseInt(id);
  const event = await getEvent(event_id, true);
  return (
    <EventPage
      event={event}
      mode="view"
    />
  );
}
