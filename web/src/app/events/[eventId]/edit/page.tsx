import EventPage from '../../components/EventPage';
import { getEvent } from '@/services/events';

interface PageProps {
  params: { eventId: string };
}

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  const event_id = parseInt(eventId);
  const event = await getEvent(event_id, true);
  return (
    <EventPage
      event={event}
      mode="edit"
    />
  );
}
