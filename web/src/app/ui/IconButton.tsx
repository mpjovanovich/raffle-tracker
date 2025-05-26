import BaseButton, { type BaseButtonProps } from './BaseButton';
import { createClassNames } from '../lib/utils';

export default function IconButton(props: BaseButtonProps) {
  const classes = createClassNames(
    'hover:bg-dark-accent hover:text-light-primary px-2 py-2',
    props.disabled && 'opacity-50 bg-dark-accent text-light-primary',
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
