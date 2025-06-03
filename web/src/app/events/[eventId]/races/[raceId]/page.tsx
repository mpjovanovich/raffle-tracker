import HorsesGrid from '@/app/events/components/HorsesGrid';
import { getRace } from '@/services/raceService';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { eventId: string; raceId: string };
}

export default async function Page({ params }: PageProps) {
  const { raceId } = await params;
  const raceIdNumber = parseInt(raceId);
  if (isNaN(raceIdNumber)) {
    notFound();
  }
  const race = await getRace(raceIdNumber, true);
  return <HorsesGrid race={race} />;
}
