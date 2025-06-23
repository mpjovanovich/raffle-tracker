import EventsPage from '@/components/page/events/EventsPage';
import { getEvents } from '@/services/eventService';
import { requireAuth } from '@/utils/authUtility';
import { ROLE } from '@raffle-tracker/dto';

export default async function Page() {
  // TODO: Viewer roles should not be able to edit stuff.
  // Probably won't have time to flush out viewer.
  // await requireAuth([ROLE.EVENT_MANAGER, ROLE.VIEWER]);
  await requireAuth([ROLE.EVENT_MANAGER]);
  const events = await getEvents();

  return <EventsPage events={events} />;
}
