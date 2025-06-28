import { getEventAction } from '@/app/actions/events';
import EventPage from '@/components/page/events/EventPage';
import { checkAuth } from '@/utils/cookieUtility';
import { ROLE } from '@raffle-tracker/dto';

interface PageProps {
  params: { eventId: string };
}

export default async function Page({ params }: PageProps) {
  await checkAuth([ROLE.EVENT_MANAGER]);
  const { eventId } = await params;
  const eventIdNumber = parseInt(eventId);
  const event = await getEventAction(eventIdNumber, true);

  return (
    <EventPage
      event={event}
      mode="edit"
    />
  );
}
