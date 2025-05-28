import CardTitle from './CardTitle';
import { createClassNames } from '../lib/utils';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Card({ children, title, className }: CardProps) {
  const classes = createClassNames(
    'bg-light-primary',
    'p-8',
    'min-w-[720px]',
    className
  );
  return (
    <div className={classes}>
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </div>
  );
}
