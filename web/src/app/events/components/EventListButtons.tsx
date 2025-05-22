'use client';

import { FaRegPenToSquare } from 'react-icons/fa6';
import IconButton from '@/app/ui/IconButton';
import { useRouter } from 'next/navigation';

interface Action {
  label: string;
  icon: React.ReactNode;
  onClick: () => Promise<void>;
}

interface EventListButtonProps {
  eventId: number;
}

const getActions = (
  eventId: number,
  // use type inference; aparently this is the best way to get the router type
  router: ReturnType<typeof useRouter>
): Action[] => {
  return [
    {
      label: 'Edit',
      icon: <FaRegPenToSquare />,
      onClick: async () => {
        router.push(`/events/${eventId}`);
      },
    },
  ];
};

export default function EventListButtons({ eventId }: EventListButtonProps) {
  const router = useRouter();
  const actions = getActions(eventId, router);

  return (
    <div>
      {actions.map(action => (
        <IconButton
          key={action.label}
          title={action.label}
          icon={action.icon}
          onClick={action.onClick}
        />
      ))}
    </div>
  );
}
