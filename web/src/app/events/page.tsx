import Card from '@/app/ui/Card';
import clsx from 'clsx';
import ItemList from '@/app/ui/ItemList';
import ItemListLink from '../ui/ItemListLink';
import SimpleButton from '@/app/ui/SimpleButton';
import { getEvents } from '@/services/events';

export default async function Events() {
  const events = await getEvents();

  return (
    <Card title="Events">
      <ItemList>
        {events.map(event => (
          <ItemListLink
            key={event.id}
            className={styles.itemListLink}
            href={`/events/${event.id}`}
          >
            {event.name}
          </ItemListLink>
        ))}
      </ItemList>
      <SimpleButton
        href="/events/create"
        className={styles.newButton}
        title="New Event"
      >
        New Event
      </SimpleButton>
    </Card>
  );
}

const styles = {
  itemListLink: clsx('w-full', 'px-6', 'py-1'),
  newButton: clsx('my-4', 'mx-4', 'cursor-pointer'),
};
