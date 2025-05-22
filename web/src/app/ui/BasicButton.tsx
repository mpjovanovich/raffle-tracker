import { BaseButton, BaseButtonProps } from './BaseButton';

export default function BasicButton({
  children,
  classname,
  href,
  onClick,
  title,
}: BaseButtonProps) {
  return (
    <BaseButton
      classname={`bg-dark-accent hover:bg-dark-primary text-light-primary px-6 py-1 ${classname}`}
      href={href}
      onClick={onClick}
      title={title}
    >
      {children}
    </BaseButton>
  );
}
