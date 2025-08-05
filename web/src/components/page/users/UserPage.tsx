import UserDetails from '@/components/page/users/UserDetails';
import UserRoles from '@/components/page/users/UserRoles';
import Card from '@/components/ui/Card';
import { User } from '@raffle-tracker/dto';

interface UserPageProps {
  user: User;
}

export default function UserPage({ user }: UserPageProps) {
  return (
    <>
      <Card title={`User: ${user.username}`}>
        <UserDetails user={user} />
      </Card>
      <UserRoles user={user} />
    </>
  );
}
