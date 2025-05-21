interface ItemListItemProps {
  children: React.ReactNode;
}

export default function ItemListItem({ children }: ItemListItemProps) {
  return (
    // <div className="flex flex-row items-center justify-between px-6 py-2 rounded-md font-bold hover:bg-light-accent2">
    <div className="flex flex-row items-center justify-between px-6 py-2 rounded-md hover:bg-light-accent2">
      {children}
    </div>
  );
}
