import { FaRegPenToSquare } from 'react-icons/fa6';
import IconButton from '@/app/ui/IconButton';
import clsx from 'clsx';

interface EventButtonProps {
  eventId: number;
}

export default function EventButtonActions({ eventId }: EventButtonProps) {
  return (
    <div className={styles.eventListButtons}>
      <IconButton
        title="Edit"
        href={`/events/${eventId}`}
      >
        <FaRegPenToSquare />
      </IconButton>
    </div>
  );
}

const styles = {
  eventListButtons: clsx('flex', 'flex-row', 'gap-2', 'items-center'),
};
