import { createClassNames } from '../lib/utils';

interface ItemListItemProps {
  children: React.ReactNode;
}

export default function ItemListItem({ children }: ItemListItemProps) {
  const classes = createClassNames(
    'flex',
    'flex-row',
    'items-center',
    'justify-between',
    'px-6',
    'py-1',
    'rounded-md',
    'hover:bg-light-accent2'
  );
  return <div className={classes}>{children}</div>;
}
