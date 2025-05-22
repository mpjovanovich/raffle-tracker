import Link from 'next/link';

export interface BaseButtonProps {
  children: React.ReactNode;
  classname?: string;
  href?: string;
  onClick?: () => Promise<void>;
  title?: string;
}

export function BaseButton({
  children,
  href,
  onClick,
  classname,
  title,
}: BaseButtonProps) {
  if (!href && !onClick) {
    throw new Error('href or onClick must be provided');
  } else if (href && onClick) {
    throw new Error('href and onClick cannot both be provided');
  }

  const buttonClassNames = `inline-block rounded-md cursor-pointer ${classname}`;

  if (href) {
    return (
      <Link
        className={buttonClassNames}
        href={href}
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
    >
      {children}
    </button>
  );
}
