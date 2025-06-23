import { getValidContestsByEventAction } from '@/app/actions/contests';
import { getEventAction } from '@/app/actions/events';
import TicketPage from '@/components/page/tickets/TicketPage';
import { requireAuth } from '@/utils/authUtility';
import { ROLE } from '@raffle-tracker/dto';

interface PageProps {
  params: { eventId: string };
}

export default async function Page({ params }: PageProps) {
  await requireAuth([ROLE.SELLER]);
  const { eventId } = await params;
  const eventIdNumber = parseInt(eventId);
  const event = await getEventAction(eventIdNumber, true);
  const contests = await getValidContestsByEventAction(eventIdNumber);

  return (
    <TicketPage
      event={event}
      contests={contests}
    />
  );
}
