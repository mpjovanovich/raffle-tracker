interface CardTitleProps {
  children: React.ReactNode;
}

export default function CardTitle({ children }: CardTitleProps) {
  return (
    <h1 className="text-2xl font-bold mb-8 border-b-1 border-light-accent2 pb-2">
      {children}
    </h1>
  );
}
