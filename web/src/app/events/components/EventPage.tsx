import Card from '@/app/ui/Card';
import EventDetails from './EventDetails';
import { Event } from '@horse-race-raffle-tracker/dto';

interface EventPageProps {
  mode: 'create' | 'edit' | 'view';
  event: Event;
}

export default function EventPage({ mode, event }: EventPageProps) {
  return (
    <>
      <Card title={`Event: ${event.name}`}>
        <EventDetails
          event={event}
          mode={mode}
        />
      </Card>
      {/* // Races will go here */}
    </>
  );
}
