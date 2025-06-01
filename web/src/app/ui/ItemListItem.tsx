import clsx from 'clsx';

interface ItemListItemProps {
  children: React.ReactNode;
  className?: string;
}

export default function ItemListItem({
  children,
  className,
}: ItemListItemProps) {
  return <div className={clsx(styles.itemListItem, className)}>{children}</div>;
}

const styles = {
  itemListItem: clsx(
    'flex',
    'flex-row',
    'items-center',
    'justify-between',
    'rounded-md',
    'hover:bg-light-accent2'
  ),
};
