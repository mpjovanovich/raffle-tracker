import { getContestAction } from '@/app/actions/contests';
import ContestPage from '@/components/page/events/ContestPage';
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

  const contest = await getContestAction(contestIdNumber, true);
  if (!contest) {
    notFound();
  }

  return <ContestPage contest={contest} />;
}
