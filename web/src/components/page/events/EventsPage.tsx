'use client';

import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import ItemList from '@/components/ui/ItemList';
import ItemListItem from '@/components/ui/ItemListItem';
import SimpleButton from '@/components/ui/SimpleButton';
import { canAccess } from '@/utils/rolesUtility';
import { Event, ROLE, Role } from '@raffle-tracker/dto';
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
  userRoles: Role[];
}

export default function EventsPage({ events, userRoles }: EventsPageProps) {
  // This is the landing page. VIEWER role can see it, but can't do anything else.
  // Admins will have to add user roles to new users.
  const canViewEdit = canAccess(userRoles, [ROLE.EVENT_MANAGER]);
  const canViewCashier = canAccess(userRoles, [
    ROLE.EVENT_MANAGER,
    ROLE.CASHIER,
  ]);
  const canViewTickets = canAccess(userRoles, [
    ROLE.EVENT_MANAGER,
    ROLE.SELLER,
  ]);
  const canViewReports = canAccess(userRoles, [ROLE.EVENT_MANAGER]);

  return (
    <Card title="Events">
      {canViewEdit && (
        <Link href="/events/create">
          <SimpleButton
            className={styles.addButton}
            title="Add Event"
          >
            Add Event
          </SimpleButton>
        </Link>
      )}
      <ItemList>
        {events.map(event => (
          <ItemListItem
            key={event.id}
            className={styles.itemListLink}
          >
            <span>{event.name}</span>
            <div className={styles.actionButtonContainer}>
              {canViewTickets && (
                <Link href={`/tickets/${event.id}`}>
                  <IconButton title="Tickets">
                    <FaTicket />
                  </IconButton>
                </Link>
              )}
              {canViewCashier && (
                <Link href={`/cashier`}>
                  <IconButton title="Cashier">
                    <FaReceipt />
                  </IconButton>
                </Link>
              )}
              {canViewReports && (
                <Link href={`/report/${event.id}`}>
                  <IconButton title="Report">
                    <FaFileContract />
                  </IconButton>
                </Link>
              )}
              {canViewEdit && (
                <Link href={`/events/${event.id}`}>
                  <IconButton title="Edit">
                    <FaPenToSquare />
                  </IconButton>
                </Link>
              )}
            </div>
          </ItemListItem>
        ))}
      </ItemList>
    </Card>
  );
}

const styles = {
  actionButtonContainer: clsx('flex', 'flex-row'),
  addButton: clsx('my-4', 'mx-4', 'cursor-pointer'),
  itemListLink: clsx('w-full', 'px-6', 'py-1'),
};
