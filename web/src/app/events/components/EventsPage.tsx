'use client';

import Card from '@/app/ui/Card';
import ItemList from '@/app/ui/ItemList';
import ItemListLink from '@/app/ui/ItemListLink';
import SimpleButton from '@/app/ui/SimpleButton';
import clsx from 'clsx';
import { Event } from '@horse-race-raffle-tracker/dto';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface EventsPageProps {
  events: Event[];
}

export default function EventsPage({ events }: EventsPageProps) {
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
      <Link href="/events/create">
        <SimpleButton
          className={styles.newButton}
          title="New Event"
        >
          New Event
        </SimpleButton>
      </Link>
    </Card>
  );
}

const styles = {
  itemListLink: clsx('w-full', 'px-6', 'py-1'),
  newButton: clsx('my-4', 'mx-4', 'cursor-pointer'),
};
