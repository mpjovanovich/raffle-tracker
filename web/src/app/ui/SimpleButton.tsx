import { BaseButton, BaseButtonProps } from './BaseButton';
import { bodyFont } from '../fonts';

export default function SimpleButton({
  children,
  classname,
  href,
  onClick,
  title,
}: BaseButtonProps) {
  return (
    <BaseButton
      // classname={`bg-dark-accent text-light-primary px-6 py-1 font-semibold ${bodyFont.className} ${classname}`}
      classname={`bg-light-accent2 hover:bg-dark-accent hover:text-light-primary px-6 py-1 font-semibold ${bodyFont.className} ${classname}`}
      href={href}
      onClick={onClick}
      title={title}
    >
      {children}
    </BaseButton>
  );
}
