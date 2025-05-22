import Card from '@/app/ui/Card';
import { Event } from '@horse-race-raffle-tracker/dto';
import { getEvent } from '@/services/events';
import EventDetails from '../components/EventDetails';

interface EventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const isNewEvent = id === 'new';
  const event_id = isNewEvent ? 0 : parseInt(id);
  const NEW_EVENT: Event = {
    id: 0,
    name: '',
    location: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  };
  const event = isNewEvent ? NEW_EVENT : await getEvent(event_id);

  return (
    <Card title={isNewEvent ? 'New Event' : `Event: ${event.name}`}>
      <EventDetails event={event} />
    </Card>
  );
}
