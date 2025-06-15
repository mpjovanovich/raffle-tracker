import { getEvent } from '@/services/eventService';
import { notFound } from 'next/navigation';
import EventPage from '../../../components/page/events/EventPage';

interface PageProps {
  params: { eventId: string };
}

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  // TODO: more consistent validation of URL params
  const eventIdNumber = parseInt(eventId);
  if (isNaN(eventIdNumber)) {
    notFound();
  }

  const event = await getEvent(eventIdNumber, true);
  if (!event) {
    notFound();
  }

  return (
    <EventPage
      event={event}
      mode="view"
    />
  );
}
