import { BaseButton, BaseButtonProps } from './BaseButton';

export default function IconButton({
  children,
  classNames,
  href,
  onClick,
  title,
}: BaseButtonProps) {
  return (
    <BaseButton
      classNames={`hover:bg-dark-accent hover:text-light-primary px-2 py-2 ${classNames}`}
      href={href}
      title={title}
      onClick={onClick}
    >
      {children}
    </BaseButton>
  );
}
