'use client';

import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import ItemList from '@/components/ui/ItemList';
import ItemListItem from '@/components/ui/ItemListItem';
import SimpleButton from '@/components/ui/SimpleButton';
import { Event } from '@raffle-tracker/dto';
import clsx from 'clsx';
import Link from 'next/link';
import {
  FaFileContract,
  FaPenToSquare,
  FaReceipt,
  FaTicket,
} from 'react-icons/fa6';

interface EventsPageProps {
  events: Event[];
}

export default function EventsPage({ events }: EventsPageProps) {
  return (
    <Card title="Events">
      <ItemList>
        {events.map(event => (
          <ItemListItem
            key={event.id}
            className={styles.itemListLink}
          >
            <span>{event.name}</span>
            <div className={styles.actionButtonContainer}>
              <Link href={`/tickets/${event.id}`}>
                <IconButton title="Tickets">
                  <FaTicket />
                </IconButton>
              </Link>
              <Link href={`/cashier`}>
                <IconButton title="Cashier">
                  <FaReceipt />
                </IconButton>
              </Link>
              <Link href={`/report/${event.id}`}>
                <IconButton title="Report">
                  <FaFileContract />
                </IconButton>
              </Link>
              <Link href={`/events/${event.id}`}>
                <IconButton title="Edit">
                  <FaPenToSquare />
                </IconButton>
              </Link>
            </div>
          </ItemListItem>
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
  actionButtonContainer: clsx('flex', 'flex-row'),
  itemListLink: clsx('w-full', 'px-6', 'py-1'),
  newButton: clsx('my-4', 'mx-4', 'cursor-pointer'),
};
