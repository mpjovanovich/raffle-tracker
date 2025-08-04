import Card from '@/components/ui/Card';
import { User } from '@raffle-tracker/dto';
import UserDetails from './UserDetails';

interface UserPageProps {
  mode: 'create' | 'edit' | 'view';
  user: User;
}

export default function UserPage({ mode, user }: UserPageProps) {
  return (
    <>
      <Card title={`User: ${user.username}`}>
        <UserDetails
          user={user}
          mode={mode}
        />
      </Card>
      {/* {mode === 'view' && <UserRoles user={user} />} */}
    </>
  );
}
