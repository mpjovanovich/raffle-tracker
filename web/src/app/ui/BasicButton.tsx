import { BaseButton, BaseButtonProps } from './BaseButton';

export default function BasicButton({
  children,
  classNames,
  href,
  onClick,
  title,
}: BaseButtonProps) {
  return (
    <BaseButton
      classNames={`bg-dark-accent hover:bg-dark-primary text-light-primary font-bold px-4 py-2 ${classNames}`}
      href={href}
      onClick={onClick}
      title={title}
    >
      {children}
    </BaseButton>
  );
}
