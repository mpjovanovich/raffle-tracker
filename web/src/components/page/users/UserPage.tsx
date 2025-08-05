import UserDetails from '@/components/page/users/UserDetails';
import UserRoles from '@/components/page/users/UserRoles';
import Card from '@/components/ui/Card';
import { RoleListItem, User } from '@raffle-tracker/dto';

interface UserPageProps {
  user: User;
  roles: RoleListItem[];
}

export default function UserPage({ user, roles }: UserPageProps) {
  return (
    <>
      <Card title={`User: ${user.username}`}>
        <UserDetails user={user} />
      </Card>
      <UserRoles
        user={user}
        roles={roles}
      />
    </>
  );
}
