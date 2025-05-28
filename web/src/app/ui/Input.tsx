import { bodyFont } from '../fonts';
import { forwardRef } from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const classes = clsx(
    styles.input,
    props.type === 'date' && styles.date,
    props.className
  );

  return (
    <input
      ref={ref}
      {...props}
      className={classes}
    />
  );
});

const styles = {
  input: clsx(
    bodyFont.className,
    'rounded-md px-4 py-2',
    'bg-light-accent',
    'border border-light-accent2',
    'outline-active',
    'read-only:bg-light-accent',
    'read-only:cursor-default',
    'read-only:outline-none',
    'read-only:focus:bg-light-accent',
    'focus:bg-light-primary'
  ),
  date: clsx('self-start'),
};

Input.displayName = 'Input';

export default Input;
