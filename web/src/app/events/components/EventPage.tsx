import Card from '@/app/ui/Card';
import { Event } from '@horse-race-raffle-tracker/dto';
import EventDetails from './EventDetails';
import RacesGrid from './RacesGrid';

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
      {mode === 'view' && <RacesGrid event={event} />}
    </>
  );
}
