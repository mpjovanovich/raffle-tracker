import { getUserAction } from '@/app/actions/users';
import ChangePasswordPage from '@/components/page/users/ChangePasswordPage';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ userId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { userId } = await params;
  const userIdNumber = parseInt(userId);
  if (isNaN(userIdNumber)) {
    notFound();
  }

  const user = await getUserAction(userIdNumber);
  if (!user.success || !user.data) {
    notFound();
  }

  return <ChangePasswordPage user={user.data} />;
}
