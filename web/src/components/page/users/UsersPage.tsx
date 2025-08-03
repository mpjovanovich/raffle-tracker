'use client';

import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import ItemList from '@/components/ui/ItemList';
import ItemListItem from '@/components/ui/ItemListItem';
import { UserListItem } from '@raffle-tracker/dto';
import Link from 'next/link';
import { FaPenToSquare } from 'react-icons/fa6';

interface UsersPageProps {
  users: UserListItem[];
}

export default function UsersPage({ users }: UsersPageProps) {
  return (
    <Card title="Users">
      <ItemList>
        {users.map(user => (
          <ItemListItem key={user.id}>
            {user.username}
            <Link href={`/users/${user.id}`}>
              <IconButton title="Edit">
                <FaPenToSquare />
              </IconButton>
            </Link>
          </ItemListItem>
        ))}
      </ItemList>
    </Card>
  );
}
