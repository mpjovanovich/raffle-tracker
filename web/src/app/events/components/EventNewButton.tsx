'use client';

import SimpleButton from '@/app/ui/SimpleButton';

interface EventNewButtonProps {
  classname?: string;
}

export default function EventNewButton({ classname }: EventNewButtonProps) {
  return (
    <SimpleButton
      href="/events/new"
      classname={classname}
    >
      New Event
    </SimpleButton>
  );
}
