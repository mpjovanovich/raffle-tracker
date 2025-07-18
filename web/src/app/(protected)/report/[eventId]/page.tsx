import { getRevenueReportAction } from '@/app/actions/reports';
import RevenueReportPage from '@/components/page/report/RevenueReportPage';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ eventId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { eventId } = await params;
  const eventIdNumber = parseInt(eventId);

  const event = await getRevenueReportAction(eventIdNumber);
  if (!event.success || !event.data) {
    notFound();
  }

  return <RevenueReportPage revenueReport={event.data} />;
}
