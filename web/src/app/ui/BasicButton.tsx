import { BaseButton, BaseButtonProps } from './BaseButton';
import { bodyFont } from '../fonts';

export default function BasicButton({
  children,
  classname,
  href,
  onClick,
  title,
}: BaseButtonProps) {
  return (
    <BaseButton
      classname={`bg-dark-accent text-light-primary px-6 py-1 font-semibold ${bodyFont.className} ${classname}`}
      href={href}
      onClick={onClick}
      title={title}
    >
      {children}
    </BaseButton>
  );
}
