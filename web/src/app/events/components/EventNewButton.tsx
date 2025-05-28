'use client';

import SimpleButton from '@/app/ui/SimpleButton';
import clsx from 'clsx';

export default function EventNewButton() {
  return (
    <SimpleButton
      href="/events/create"
      className={styles.eventNewButton}
      title="New Event"
    >
      New Event
    </SimpleButton>
  );
}

const styles = {
  eventNewButton: clsx('my-4', 'mx-4'),
};
