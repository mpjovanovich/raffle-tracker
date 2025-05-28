import { bodyFont } from '../fonts';
import { createClassNames } from '../lib/utils';

interface ItemListProps {
  children: React.ReactNode;
  className?: string;
}

export default function ItemList({ children, className }: ItemListProps) {
  const classes = createClassNames(
    'flex',
    'flex-col',
    'gap-1',
    bodyFont.className,
    className
  );
  return <div className={classes}>{children}</div>;
}
