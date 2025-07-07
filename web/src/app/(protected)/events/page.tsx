import { getAuthUser } from '@/app/actions/auth';
import { getEventsAction } from '@/app/actions/events';
import EventsPage from '@/components/page/events/EventsPage';
import { notFound } from 'next/navigation';

export default async function Page() {
  const user = await getAuthUser();
  const events = await getEventsAction();

  if (!events.success || !events.data) {
    notFound();
  }

  return (
    <EventsPage
      events={events.data}
      userRoles={user.roles ?? []}
    />
  );
}
