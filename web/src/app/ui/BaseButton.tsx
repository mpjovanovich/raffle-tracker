import { forwardRef } from 'react';
import clsx from 'clsx';

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const BaseButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  BaseButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <button
      className={clsx(styles.button, className)}
      ref={ref as React.Ref<HTMLButtonElement>}
      {...props}
    >
      {children}
    </button>
  );
});

const styles = {
  button: clsx(
    'inline-block',
    'rounded-md',
    'cursor-pointer',
    'hover:bg-dark-accent',
    'hover:bg-dark-accent',
    'hover:text-light-primary'
  ),
};

BaseButton.displayName = 'BaseButton';

export default BaseButton;
