import { FaRegPenToSquare } from 'react-icons/fa6';
import IconButton from '@/app/ui/IconButton';

interface EventButtonProps {
  eventId: number;
}

export default function EventButtonActions({ eventId }: EventButtonProps) {
  return (
    <div className="flex flex-row gap-2 items-center>">
      <IconButton
        title="Edit"
        href={`/events/${eventId}`}
      >
        <FaRegPenToSquare />
      </IconButton>
    </div>
  );
}
