import clsx from 'clsx';

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardTitle({ children, className }: CardTitleProps) {
  return <h1 className={clsx(styles.cardTitle, className)}>{children}</h1>;
}

const styles = {
  cardTitle: clsx(
    'text-2xl',
    'font-bold',
    'mb-6',
    'px-6',
    'py-2',
    'border-b-1',
    'border-light-accent2',
    'pb-2'
  ),
};
