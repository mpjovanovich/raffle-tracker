import UserDetails from '@/components/page/users/UserDetails';
import UserRoles from '@/components/page/users/UserRoles';
import Card from '@/components/ui/Card';
import SimpleButton from '@/components/ui/SimpleButton';
import { RoleListItem, User } from '@raffle-tracker/dto';
import Link from 'next/link';

interface UserPageProps {
  user: User;
  roles: RoleListItem[];
}

export default function UserPage({ user, roles }: UserPageProps) {
  return (
    <>
      <Card title={`User: ${user.username}`}>
        <UserDetails user={user} />
        <Link href={`/users/${user.id}/changePassword`}>
          <SimpleButton
            className="mt-4"
            title="Change Password"
          >
            Change Password
          </SimpleButton>
        </Link>
      </Card>
      <UserRoles
        user={user}
        roles={roles}
      />
    </>
  );
}
