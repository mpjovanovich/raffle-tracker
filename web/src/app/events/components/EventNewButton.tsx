'use client';

import BasicButton from '@/app/ui/BasicButton';

interface EventNewButtonProps {
  classNames?: string;
}

export default function EventNewButton({ classNames }: EventNewButtonProps) {
  return (
    <BasicButton
      href="/events/new"
      classNames={classNames}
    >
      New Event
    </BasicButton>
  );
}
