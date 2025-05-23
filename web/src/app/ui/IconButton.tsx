import BaseButton, { type BaseButtonProps } from './BaseButton';

export default function IconButton(props: BaseButtonProps) {
  return (
    <BaseButton
      {...props}
      className={`hover:bg-dark-accent hover:text-light-primary px-2 py-2 ${props.className ?? ''}`}
    >
      {props.children}
    </BaseButton>
  );
}
