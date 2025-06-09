import clsx from 'clsx';
import { bodyFont } from '../fonts';

interface ItemListProps {
  children?: React.ReactNode;
  className?: string;
}

export default function ItemList({ children, className }: ItemListProps) {
  return <div className={clsx(styles.itemList, className)}>{children}</div>;
}

const styles = {
  itemList: clsx('flex', 'flex-col', 'gap-2', bodyFont.className),
};
