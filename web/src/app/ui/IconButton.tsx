interface IconButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick?: () => Promise<void>;
  classNames?: string;
}

export default function IconButton({
  title,
  icon,
  onClick,
  classNames,
}: IconButtonProps) {
  return (
    <button
      className={`p-2 rounded-md cursor-pointer hover:bg-light-accent ${classNames}`}
      title={title}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}
