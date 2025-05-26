import BaseButton, { type BaseButtonProps } from './BaseButton';
import { bodyFont } from '../fonts';
import { createClassNames } from '../lib/utils';

export default function SimpleButton(props: BaseButtonProps) {
  const classes = createClassNames(
    'bg-light-accent2',
    'hover:bg-dark-accent',
    'hover:text-light-primary',
    'px-6',
    'py-1',
    'font-semibold',
    bodyFont.className,
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
