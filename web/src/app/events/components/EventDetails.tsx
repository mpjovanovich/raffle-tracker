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
          placeholder="Name"
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
          placeholder="Location"
          value={localEvent.location}
          onChange={e => {
            setLocalEvent({ ...localEvent, location: e.target.value });
          }}
        />
      </LabeledField>
      <LabeledField
        label="Start Date"
        htmlFor="startDate"
      >
        <Input
          type="date"
          name="startDate"
          value={localEvent.startDate}
          onChange={e => {
            setLocalEvent({ ...localEvent, startDate: e.target.value });
          }}
        />
      </LabeledField>
      <LabeledField
        label="End Date"
        htmlFor="endDate"
      >
        <Input
          type="date"
          name="endDate"
          value={localEvent.endDate}
          onChange={e => {
            setLocalEvent({ ...localEvent, endDate: e.target.value });
          }}
        />
      </LabeledField>
    </>
  );
}
