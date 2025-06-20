import TicketPage from '@/components/page/tickets/TicketPage';
import { getValidContestsByEvent } from '@/services/contestService';
import { getEvent } from '@/services/eventService';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { eventId: string };
}

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  const eventIdNumber = parseInt(eventId);
  if (isNaN(eventIdNumber)) {
    notFound();
  }

  const event = await getEvent(eventIdNumber, true);
  const contests = await getValidContestsByEvent(eventIdNumber);

  return (
    <TicketPage
      contests={contests}
      event={event}
    />
  );
}
