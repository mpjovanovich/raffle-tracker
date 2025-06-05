import Card from '@/app/ui/Card';
import { Event } from '@raffle-tracker/dto';
import ContestsGrid from './ContestsGrid';
import EventDetails from './EventDetails';

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
      {mode === 'view' && <ContestsGrid event={event} />}
    </>
  );
}
