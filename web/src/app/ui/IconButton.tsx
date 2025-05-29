import BaseButton, { type BaseButtonProps } from './BaseButton';
import clsx from 'clsx';

export default function IconButton(props: BaseButtonProps) {
  return (
    <BaseButton
      {...props}
      className={clsx(
        styles.iconButton,
        props.disabled && styles.disabled,
        props.className
      )}
    >
      {props.children}
    </BaseButton>
  );
}

const styles = {
  iconButton: clsx('p-2'),
  disabled: clsx('opacity-50', 'pointer-events-none'),
};
