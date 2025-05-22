import { BaseButton, BaseButtonProps } from './BaseButton';

export default function IconButton({
  children,
  classname,
  href,
  onClick,
  title,
}: BaseButtonProps) {
  return (
    <BaseButton
      classname={`hover:bg-dark-accent hover:text-light-primary px-2 py-2 ${classname}`}
      href={href}
      title={title}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
