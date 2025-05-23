import BaseButton, { type BaseButtonProps } from './BaseButton';

export default function IconButton(props: BaseButtonProps) {
  let className = `hover:bg-dark-accent hover:text-light-primary px-2 py-2 ${props.className ?? ''}`;
  if (props.disabled) {
    className += ' opacity-50 bg-dark-accent text-light-primary';
  }
  return (
    <BaseButton
      {...props}
      className={className}
    >
      {props.children}
    </BaseButton>
  );
}
