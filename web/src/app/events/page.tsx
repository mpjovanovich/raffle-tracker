import Card from '@/app/ui/Card';
import clsx from 'clsx';
import ItemList from '@/app/ui/ItemList';
import ItemListItem from '@/app/ui/ItemListItem';
import Link from 'next/link';
import SimpleButton from '@/app/ui/SimpleButton';
import { getEvents } from '@/services/events';

export default async function Events() {
  const events = await getEvents();

  return (
    <Card title="Events">
      <ItemList>
        {events.map(event => (
          <ItemListItem key={event.id}>
            <Link
              className={styles.itemListLink}
              href={`/events/${event.id}`}
            >
              {event.name}
            </Link>
          </ItemListItem>
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
