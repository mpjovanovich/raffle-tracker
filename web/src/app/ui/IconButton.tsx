import BaseButton, { type BaseButtonProps } from './BaseButton';
import clsx from 'clsx';

export default function IconButton(props: BaseButtonProps) {
  const classes = clsx(
    styles.iconButton,
    props.disabled && styles.disabled,
    props.className
  );
  return (
    <BaseButton
      {...props}
      className={classes}
    >
      {props.children}
    </BaseButton>
  );
}

const styles = {
  iconButton: clsx('hover:bg-dark-accent hover:text-light-primary px-2 py-2'),
  disabled: clsx('opacity-50 bg-dark-accent text-light-primary'),
};
