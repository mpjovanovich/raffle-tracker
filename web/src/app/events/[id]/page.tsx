import Card from '@/app/ui/Card';
import { Event } from '@horse-race-raffle-tracker/dto';
import { getEvent } from '@/services/events';

export default async function EventPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const isNewEvent = id === 'new';
  const event_id = isNewEvent ? 0 : parseInt(id);
  const NEW_EVENT: Event = {
    id: 0,
    name: '',
    location: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
  };
  const event = isNewEvent ? NEW_EVENT : await getEvent(event_id);

  return (
    <Card title={isNewEvent ? 'New Event' : `Event: ${event.name}`}>
      <h1>Event: {event.name}</h1>
    </Card>
  );
}
