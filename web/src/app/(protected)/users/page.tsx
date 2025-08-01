import { getUsers } from '@/app/actions/users';
import { notFound } from 'next/navigation';

export default async function Page() {
  const users = await getUsers();

  if (!users.success || !users.data) {
    notFound();
  }

  return <div>Users</div>;
  //   return <UsersPage users={users.data} />;
}
