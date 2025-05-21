interface ItemListProps {
  children: React.ReactNode;
}

export default function ItemList({ children }: ItemListProps) {
  return <div className="flex flex-col gap-1">{children}</div>;
}
