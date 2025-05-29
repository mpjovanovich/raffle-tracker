import BaseButton, { type BaseButtonProps } from './BaseButton';
import { bodyFont } from '../fonts';
import clsx from 'clsx';

export default function SimpleButton(props: BaseButtonProps) {
  return (
    <BaseButton
      {...props}
      className={clsx(styles.button, props.className)}
    >
      {props.children}
    </BaseButton>
  );
}

const styles = {
  button: clsx(
    'bg-light-accent2',
    'hover:bg-dark-accent',
    'hover:text-light-primary',
    'px-6',
    'py-2',
    'font-semibold',
    bodyFont.className
  ),
};
