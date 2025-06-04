import clsx from 'clsx';
import CardTitle from './CardTitle';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Card({ children, title, className }: CardProps) {
  return (
    <div className={clsx(styles.card, className)}>
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </div>
  );
}

const styles = {
  card: clsx('bg-light-primary', 'p-8', 'min-w-[720px]'),
};
