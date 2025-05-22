'use client';

import BasicButton from '@/app/ui/BasicButton';

interface EventNewButtonProps {
  classname?: string;
}

export default function EventNewButton({ classname }: EventNewButtonProps) {
  return (
    <BasicButton
      href="/events/new"
      classname={classname}
    >
      New Event
    </BasicButton>
  );
}
