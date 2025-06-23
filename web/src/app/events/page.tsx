import { getEventsAction } from '@/app/actions/events';
import EventsPage from '@/components/page/events/EventsPage';
import { requireAuth } from '@/utils/authUtility';
import { ROLE } from '@raffle-tracker/dto';

export default async function Page() {
  // TODO: Viewer roles should not be able to edit stuff.
  // Probably won't have time to flush out viewer.
  // await requireAuth([ROLE.EVENT_MANAGER, ROLE.VIEWER]);
  await requireAuth([ROLE.EVENT_MANAGER]);
  const events = await getEventsAction();

  return <EventsPage events={events} />;
}
