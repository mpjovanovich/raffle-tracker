import Card from '../ui/Card';
import { getEvents } from '@/services/events';

export default async function Events() {
  const events = await getEvents();

  return (
    <Card title="Events">
      {events.map(event => (
        <div key={event.id}>{event.name}</div>
      ))}
    </Card>
  );
}
