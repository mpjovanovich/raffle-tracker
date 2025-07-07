import { getAuthUser } from '@/app/actions/auth';
import { getEventsAction } from '@/app/actions/events';
import EventsPage from '@/components/page/events/EventsPage';

export default async function Page() {
  const user = await getAuthUser();
  const events = await getEventsAction();

  return (
    <EventsPage
      events={events}
      userRoles={user.roles ?? []}
    />
  );
}
