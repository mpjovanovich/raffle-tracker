interface BasicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  classNames?: string;
}

export default function BasicButton({
  children,
  onClick,
  classNames,
}: BasicButtonProps) {
  return (
    <button
      className={`bg-dark-accent hover:bg-dark-primary text-light-primary font-bold px-4 py-2 rounded-md cursor-pointer ${classNames}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
