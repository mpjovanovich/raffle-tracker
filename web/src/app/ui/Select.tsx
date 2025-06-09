import clsx from 'clsx';
import { forwardRef } from 'react';
import { bodyFont } from '../fonts';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const classes = clsx(styles.input, props.className);

  return (
    <select
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
};

Select.displayName = 'Select';

export default Select;
