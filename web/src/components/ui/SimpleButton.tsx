import clsx from 'clsx';
import { bodyFont } from '../../app/fonts';
import BaseButton, { type BaseButtonProps } from './BaseButton';

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
    'px-6',
    'py-1',
    'font-semibold',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    bodyFont.className
  ),
};
