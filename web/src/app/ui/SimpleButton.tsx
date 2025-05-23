import { BaseButton, type BaseButtonProps } from './BaseButton';
import { bodyFont } from '../fonts';

export default function SimpleButton(props: BaseButtonProps) {
  return (
    <BaseButton
      {...props}
      className={`bg-light-accent2 hover:bg-dark-accent hover:text-light-primary px-6 py-1 font-semibold ${bodyFont.className} ${props.className ?? ''}`}
    >
      {props.children}
    </BaseButton>
  );
}
