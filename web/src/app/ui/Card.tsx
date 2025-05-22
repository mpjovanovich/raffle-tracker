import CardTitle from './CardTitle';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
}

export default function Card({ children, title }: CardProps) {
  return (
    <>
      <div className="bg-light-primary p-8 min-w-[720px]">
        {title && <CardTitle>{title}</CardTitle>}
        {children}
      </div>
    </>
  );
}
