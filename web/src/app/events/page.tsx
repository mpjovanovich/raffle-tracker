import { checkAuth } from '@/app/actions/auth';
import { getEventsAction } from '@/app/actions/events';
import EventsPage from '@/components/page/events/EventsPage';
import { ROLE } from '@raffle-tracker/dto';

export default async function Page() {
  const user = await checkAuth([
    ROLE.CASHIER,
    ROLE.EVENT_MANAGER,
    ROLE.SELLER,
    ROLE.VIEWER,
  ]);
  const events = await getEventsAction();

  return (
    <EventsPage
      events={events}
      userRoles={user.roles ?? []}
    />
  );
}
