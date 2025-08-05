import { getRolesAction, getUserAction } from '@/app/actions/users';
import UserPage from '@/components/page/users/UserPage';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ userId: string }>;
}

// THIS PAGE SHOULD NEVER BE ACCESSIBLE TO ANYONE WHO IS NOT AN ADMIN!
// THIS PAGE SHOULD NEVER BE ACCESSIBLE TO ANYONE WHO IS NOT AN ADMIN!
// THIS PAGE SHOULD NEVER BE ACCESSIBLE TO ANYONE WHO IS NOT AN ADMIN!
export default async function Page({ params }: PageProps) {
  const { userId } = await params;
  const userIdNumber = parseInt(userId);

  const user = await getUserAction(userIdNumber);
  if (!user.success || !user.data) {
    notFound();
  }

  const roles = await getRolesAction();
  if (!roles.success || !roles.data) {
    notFound();
  }

  return (
    <UserPage
      user={user.data}
      roles={roles.data}
    />
  );
}
