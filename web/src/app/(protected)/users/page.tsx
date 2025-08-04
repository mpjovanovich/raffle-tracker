import { getUsersAction } from '@/app/actions/users';
import UsersPage from '@/components/page/users/UsersPage';
import { notFound } from 'next/navigation';

export default async function Page() {
  const users = await getUsersAction();

  if (!users.success || !users.data) {
    notFound();
  }

  return <UsersPage users={users.data} />;
}
