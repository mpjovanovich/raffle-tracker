import clsx from 'clsx';
import Link from 'next/link';

interface ItemListLinkProps {
  children?: React.ReactNode;
  className?: string;
  href: string;
}

// The children for this are expected to be the button lists if there are any.
export default function ItemListLink({
  children,
  className,
  href,
}: ItemListLinkProps) {
  return (
    <Link
      className={clsx(styles.itemListLink, className)}
      href={href}
    >
      {children}
    </Link>
  );
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
