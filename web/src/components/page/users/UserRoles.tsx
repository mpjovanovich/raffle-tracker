'use client';

// import { addRoleAction, deleteRoleAction } from '@/app/actions/roles';
import Card from '@/components/ui/Card';
import ItemList from '@/components/ui/ItemList';
import { User } from '@raffle-tracker/dto';
import clsx from 'clsx';
import { useState } from 'react';

interface UserRolesProps {
  user: User;
}

export default function UserRoles({ user }: UserRolesProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  return (
    <div className={styles.contestContainer}>
      <Card title="Roles">
        {error && <p className={styles.error}>{error}</p>}
        <ItemList>
          {/* {user.roles?.map(role => (
              <ItemListItem key={role}>
                <span>{role}</span>
                <div className={styles.actionButtonContainer}>
                  <IconButton
                    title="Enabled"
                    className={clsx(role.winner && styles.winner)}
                    disabled={mode === "view"}
                    onClick={() => {
                    //   handleToggleRole(horse);
                    }}
                  >
                    {horse.winner ? <FaCircleCheck /> : <FaCheck />}
                  </IconButton>
                </div>
              </ItemListItem>
            ))} */}
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
};
