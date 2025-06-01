// import HorsesGrid from '@/components/HorsesGrid';
import { getRace } from '@/services/events';

interface PageProps {
  params: { eventId: string; raceId: string };
}

export default async function Page({ params }: PageProps) {
  const { eventId, raceId } = await params;
  const event_id = parseInt(eventId);
  const race_id = parseInt(raceId);
  const race = await getRace(event_id, race_id, true);
  //   return <HorsesGrid race={race} />;
}
