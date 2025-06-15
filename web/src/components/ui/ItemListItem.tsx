import clsx from 'clsx';

interface ItemListItemProps {
  children?: React.ReactNode;
  className?: string;
}

// The children for this are expected to be the button lists if there are any.
export default function ItemListItem({
  children,
  className,
}: ItemListItemProps) {
  return <div className={clsx(styles.itemListLink, className)}>{children}</div>;
}

const styles = {
  itemListLink: clsx(
    'flex',
    'flex-row',
    'items-center',
    'justify-between',
    'rounded-md',
    'hover:bg-light-accent2',
    'w-full',
    'px-6',
    'py-1'
  ),
};
