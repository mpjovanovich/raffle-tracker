import { getValidContestsByEvent } from '@/services/contestService';
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

  const contests = await getValidContestsByEvent(eventIdNumber);
  console.log(contests);

  return <div>Tickets</div>;
}
