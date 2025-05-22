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
      classNames={`bg-dark-accent hover:bg-dark-primary text-light-primary px-6 py-1 ${classNames}`}
      href={href}
      onClick={onClick}
      title={title}
    >
      {children}
    </BaseButton>
  );
}
