import { getEventAction } from '@/app/actions/events';
import EventPage from '@/components/page/events/EventPage';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  const eventIdNumber = parseInt(eventId);
  const result = await getEventAction(eventIdNumber, true);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <EventPage
      event={result.data}
      mode="edit"
    />
  );
}
