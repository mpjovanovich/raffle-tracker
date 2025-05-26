import { bodyFont } from '../fonts';
import { createClassNames } from '../lib/utils';

interface ItemListProps {
  children: React.ReactNode;
}

export default function ItemList({ children }: ItemListProps) {
  const classes = createClassNames(
    'flex',
    'flex-col',
    'gap-1',
    bodyFont.className
  );
  return <div className={classes}>{children}</div>;
}
