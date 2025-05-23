import { forwardRef } from 'react';
import Link from 'next/link';

// Don't allow href for a "button"
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  href?: never;
}

// Don't allow onClick for a "linkbutton"
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  onClick?: never;
}

export type BaseButtonProps = ButtonProps | LinkProps;

const BaseButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  BaseButtonProps
>(({ className, children, ...props }, ref) => {
  const buttonClassNames = `inline-block rounded-md cursor-pointer ${className ?? ''}`;

  if ('href' in props) {
    const linkProps = props as LinkProps;
    return (
      <Link
        className={buttonClassNames}
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
        className={buttonClassNames}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
});

BaseButton.displayName = 'BaseButton';

export default BaseButton;
