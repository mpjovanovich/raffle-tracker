'use client';

import { toggleRoleAction } from '@/app/actions/users';
import Card from '@/components/ui/Card';
import IconButton from '@/components/ui/IconButton';
import ItemList from '@/components/ui/ItemList';
import ItemListItem from '@/components/ui/ItemListItem';
import { RoleListItem, User } from '@raffle-tracker/dto';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCheck, FaCircleCheck } from 'react-icons/fa6';

interface UserRolesProps {
  user: User;
  roles: RoleListItem[];
}

export default function UserRoles({ user, roles }: UserRolesProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const rolesHad = roles.filter(role =>
    user.roles?.some(userRole => userRole === role.name)
  );

  const handleToggleRole = async (userId: number, roleId: number) => {
    try {
      await toggleRoleAction(userId, roleId);
      router.push(`/users/${userId}`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred. Please contact an administrator.'
      );
    }
  };
  return (
    <div className={styles.contestContainer}>
      <Card title="Roles">
        {error && <p className={styles.error}>{error}</p>}
        <ItemList>
          {roles.map(role => (
            <ItemListItem key={role.id}>
              <span>{role.name}</span>
              <div className={styles.actionButtonContainer}>
                <IconButton
                  title="Enabled"
                  className={clsx(rolesHad.includes(role) && styles.hasRole)}
                  onClick={() => {
                    handleToggleRole(user.id, role.id);
                  }}
                  disabled={role.name === 'VIEWER'}
                >
                  {rolesHad.includes(role) ? <FaCircleCheck /> : <FaCheck />}
                </IconButton>
              </div>
            </ItemListItem>
          ))}
        </ItemList>
      </Card>
    </div>
  );
}

const styles = {
  actionButtonContainer: clsx('flex', 'flex-row', 'gap-1'),
  error: clsx('text-red-500'),
  itemAdd: clsx(
    'border-t-2',
    'border-light-accent2',
    'flex',
    'flex-row',
    'justify-end',
    'gap-4',
    'px-8'
  ),
  itemAddButton: clsx('my-2', 'h-fit'),
  itemAddLabeledField: clsx('flex-row', 'items-center', 'justify-end', 'm-0'),
  itemAddLabeledFieldNumber: clsx('w-20'),
  contestContainer: clsx(
    'border-2',
    'border-light-accent2',
    'rounded-sm',
    'm-6'
  ),
  hasRole: clsx('text-green-500', 'text-xl'),
};
