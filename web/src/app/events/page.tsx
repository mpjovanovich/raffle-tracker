import Card from '../ui/Card';
import { getEvents } from '@/services/events';
import ItemList from '../ui/ItemList';
import ItemListItem from '../ui/ItemListItem';
import EventButtonActions from './components/EventButtonActions';

export default async function Events() {
  const events = await getEvents();

  return (
    <Card title="Events">
      <ItemList>
        {events.map(event => (
          <ItemListItem key={event.id}>
            <span>{event.name}</span>
            <EventButtonActions eventId={event.id} />
          </ItemListItem>
        ))}
      </ItemList>
    </Card>
  );
}
