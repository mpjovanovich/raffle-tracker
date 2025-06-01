import { MouseEvent } from 'react';
import { type BaseButtonProps } from './BaseButton';
import IconButton from './IconButton';

export default function ActionButton(props: BaseButtonProps) {
  const handleClick = (e: MouseEvent) => {
    // Only prevent navigation if it's not a link
    if (!('href' in props)) {
      e.preventDefault();
      e.stopPropagation();
    }
    // onclick?.(e as MouseEvent<HTMLButtonElement>);
  };

  return (
    <IconButton
      //   {...props}
      onClick={handleClick}
    >
      {props.children}
    </IconButton>
  );
}
