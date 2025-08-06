import { getUserAction } from '@/app/actions/users';
import ChangePasswordPage from '@/components/page/users/ChangePasswordPage';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { userId: string } }) {
  let { userId } = await params;
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
