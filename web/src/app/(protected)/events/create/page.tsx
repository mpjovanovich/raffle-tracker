import { checkAuth } from '@/app/actions/auth';
import EventPage from '@/components/page/events/EventPage';
import { Event, ROLE } from '@raffle-tracker/dto';

export default async function Page() {
  await checkAuth([ROLE.EVENT_MANAGER]);

  const new_event: Event = {
    id: 0,
    name: '',
    location: '',
    startDate: '',
    endDate: '',
    closed: 0,
  };
  return (
    <EventPage
      event={new_event}
      mode="create"
    />
  );
}
