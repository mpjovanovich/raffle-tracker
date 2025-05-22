import Card from '../ui/Card';
import { getEvents } from '@/services/events';
import ItemList from '../ui/ItemList';
import ItemListItem from '../ui/ItemListItem';
import EventListButtons from './components/EventListButtons';
import EventNewButton from './components/EventNewButton';

export default async function Events() {
  const events = await getEvents();

  return (
    <Card title="Events">
      <ItemList>
        {events.map(event => (
          <ItemListItem key={event.id}>
            <span>{event.name}</span>
            <EventListButtons eventId={event.id} />
          </ItemListItem>
        ))}
      </ItemList>
      <EventNewButton classNames="my-4 mx-4" />
    </Card>
  );
}
