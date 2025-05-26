import CardTitle from './CardTitle';
import { createClassNames } from '../lib/utils';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
}

export default function Card({ children, title }: CardProps) {
  const classes = createClassNames('bg-light-primary', 'p-8', 'min-w-[720px]');
  return (
    <div className={classes}>
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </div>
  );
}
