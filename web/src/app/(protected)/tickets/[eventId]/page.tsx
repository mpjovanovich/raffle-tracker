import { getValidContestsByEventAction } from '@/app/actions/contests';
import { getEventAction } from '@/app/actions/events';
import TicketPage from '@/components/page/tickets/TicketPage';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  const eventIdNumber = parseInt(eventId);
  const event = await getEventAction(eventIdNumber, true);
  const contests = await getValidContestsByEventAction(eventIdNumber);

  if (!event.success || !event.data || !contests.success || !contests.data) {
    notFound();
  }

  return (
    <TicketPage
      event={event.data}
      contests={contests.data}
    />
  );
}
