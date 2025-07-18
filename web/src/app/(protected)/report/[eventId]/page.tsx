import { getEventSalesReportAction } from '@/app/actions/reports';
import EventSalesReportPage from '@/components/page/report/EventSalesReportPage';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  const eventIdNumber = parseInt(eventId);

  const event = await getEventSalesReportAction(eventIdNumber);
  if (!event.success || !event.data) {
    notFound();
  }

  return <EventSalesReportPage eventSalesReport={event.data} />;
}
