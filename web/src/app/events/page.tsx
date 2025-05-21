import Card from '../ui/Card';
import { getEvents } from '@/services/events';
import ItemList from '../ui/ItemList';
import ItemListItem from '../ui/ItemListItem';

export default async function Events() {
  const events = await getEvents();

  return (
    <Card title="Events">
      <ItemList>
        {events.map(event => (
          <ItemListItem key={event.id}>
            <span>{event.name}</span>
          </ItemListItem>
        ))}
        {/* <ItemListItem>
          <p>Event 1</p>
          <p>Event 2</p>
        </ItemListItem> */}
      </ItemList>
    </Card>
  );
}
