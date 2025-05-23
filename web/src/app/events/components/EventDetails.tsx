'use client';

import IconButton from '@/app/ui/IconButton';
import Input from '@/app/ui/Input';
import LabeledField from '@/app/ui/LabeledField';
import { FaRegFloppyDisk } from 'react-icons/fa6';
import { Event } from '@horse-race-raffle-tracker/dto';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface EventDetailsProps {
  event: Event;
}

// TODO: when in read mode bg should be light gray as it is now.
// When in edit mode, bg should be white as it is on focus

export default function EventDetails({ event }: EventDetailsProps) {
  const [localEvent, setLocalEvent] = useState<Event>({ ...event });
  return (
    <form>
      <div className="flex justify-end mb-2">
        <IconButton
          title="Save"
          type="submit"
          onClick={e => {
            e.preventDefault();
            console.log('saving...');
          }}
        >
          <FaRegFloppyDisk />
        </IconButton>
      </div>
      <LabeledField
        label="Name"
        htmlFor="name"
      >
        <Input
          type="text"
          name="name"
          placeholder="Name"
          required
          defaultValue={localEvent.name}
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
          required
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
          required
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
          required
          value={localEvent.endDate}
          onChange={e => {
            setLocalEvent({ ...localEvent, endDate: e.target.value });
          }}
        />
      </LabeledField>
    </form>
  );
}
