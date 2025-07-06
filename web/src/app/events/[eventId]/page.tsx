import { getEventAction } from '@/app/actions/events';
import EventPage from '@/components/page/events/EventPage';

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  const eventIdNumber = parseInt(eventId);
  const event = await getEventAction(eventIdNumber, true);

  return (
    <EventPage
      event={event}
      mode="view"
    />
  );
}
