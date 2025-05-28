import { forwardRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

// Don't allow href for a "button"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  disabled?: boolean;
  href?: never;
}

// Don't allow onClick for a "linkbutton"
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  disabled?: boolean;
  onClick?: never;
}

export type BaseButtonProps = ButtonProps | LinkProps;

const BaseButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  BaseButtonProps
>(({ className, children, ...props }, ref) => {
  if ('href' in props) {
    const linkProps = props as LinkProps;
    return (
      <Link
        className={clsx(styles.button, className)}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...linkProps}
      >
        {children}
      </Link>
    );
  } else {
    const buttonProps = props as ButtonProps;
    return (
      <button
        className={clsx(styles.button, className)}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
});

const styles = {
  button: clsx('inline-block', 'rounded-md', 'cursor-pointer'),
};

BaseButton.displayName = 'BaseButton';

export default BaseButton;
