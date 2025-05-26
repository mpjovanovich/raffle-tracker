import { createClassNames } from '../lib/utils';

interface CardTitleProps {
  children: React.ReactNode;
}

export default function CardTitle({ children }: CardTitleProps) {
  const classes = createClassNames(
    'text-2xl',
    'font-bold',
    'mb-6',
    'px-6',
    'py-2',
    'border-b-1',
    'border-light-accent2',
    'pb-2'
  );
  return <h1 className={classes}>{children}</h1>;
}
