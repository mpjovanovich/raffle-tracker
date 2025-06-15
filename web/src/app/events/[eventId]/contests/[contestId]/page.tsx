import HorsesGrid from '@/components/page/events/HorsesGrid';
import { getContest } from '@/services/contestService';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { eventId: string; contestId: string };
}

export default async function Page({ params }: PageProps) {
  const { contestId } = await params;
  const contestIdNumber = parseInt(contestId);
  if (isNaN(contestIdNumber)) {
    notFound();
  }

  const contest = await getContest(contestIdNumber, true);
  if (!contest) {
    notFound();
  }

  return <HorsesGrid contest={contest} />;
}
