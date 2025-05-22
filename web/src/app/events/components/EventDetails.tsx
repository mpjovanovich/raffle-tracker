'use client';

import Input from '@/app/ui/Input';
import LabeledField from '@/app/ui/LabeledField';
import { Event } from '@horse-race-raffle-tracker/dto';
import { useState } from 'react';

interface EventDetailsProps {
  event: Event;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const [localEvent, setLocalEvent] = useState<Event>({ ...event });
  return (
    <>
      <LabeledField
        label="Name"
        htmlFor="name"
      >
        <Input
          type="text"
          name="name"
          value={localEvent.name}
          onChange={e => {
            setLocalEvent({ ...localEvent, name: e.target.value });
          }}
        />
      </LabeledField>
      <LabeledField
        label="Location"
        htmlFor="location"
      >
        <Input
          type="text"
          name="location"
          value={localEvent.location}
          onChange={e => {
            setLocalEvent({ ...localEvent, location: e.target.value });
          }}
        />
      </LabeledField>
    </>
  );
}
