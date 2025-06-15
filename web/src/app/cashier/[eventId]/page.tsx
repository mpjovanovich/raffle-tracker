import CashierPage from '@/components/page/cashier/CashierPage';
import { getEvent } from '@/services/eventService';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { eventId: string };
}

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  const eventIdNumber = parseInt(eventId);
  if (isNaN(eventIdNumber)) {
    notFound();
  }
  const event = await getEvent(eventIdNumber, true);
  if (!event) {
    notFound();
  }

  return <CashierPage event={event} />;
}
