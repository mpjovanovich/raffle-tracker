import { getEvent } from '@/services/eventService';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { eventId: string };
}

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  // TODO: more consistent validation of URL params
  const eventIdNumber = parseInt(eventId);
  if (isNaN(eventIdNumber)) {
    notFound();
  }

  let event = await getEvent(eventIdNumber, true, false);
  console.log(event);

  return <div>Tickets</div>;
}
