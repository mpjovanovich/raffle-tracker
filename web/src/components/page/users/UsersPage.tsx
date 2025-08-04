'use client';

import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import ItemList from '@/components/ui/ItemList';
import ItemListItem from '@/components/ui/ItemListItem';
import SimpleButton from '@/components/ui/SimpleButton';
import { UserListItem } from '@raffle-tracker/dto';
import clsx from 'clsx';
import Link from 'next/link';
import { FaPenToSquare } from 'react-icons/fa6';

interface UsersPageProps {
  users: UserListItem[];
}

export default function UsersPage({ users }: UsersPageProps) {
  return (
    <Card title="Users">
      <Link href="/users/create">
        <SimpleButton
          className={styles.addButton}
          title="Add User"
        >
          Add User
        </SimpleButton>
      </Link>
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

const styles = {
  addButton: clsx('my-4', 'mx-4', 'cursor-pointer'),
};
