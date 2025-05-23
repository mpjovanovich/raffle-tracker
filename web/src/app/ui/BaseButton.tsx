import Link from 'next/link';

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
}

export function BaseButton({
  children,
  className,
  href,
  onClick,
  title,
  type,
}: BaseButtonProps) {
  if (!href && !onClick) {
    throw new Error('href or onClick must be provided');
  } else if (href && onClick) {
    throw new Error('href and onClick cannot both be provided');
  }

  const buttonClassNames = `inline-block rounded-md cursor-pointer ${className}`;

  if (href) {
    return (
      <Link
        className={buttonClassNames}
        href={href}
        title={title ?? ''}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={buttonClassNames}
      onClick={onClick}
      title={title ?? ''}
      type={type}
    >
      {children}
    </button>
  );
}
