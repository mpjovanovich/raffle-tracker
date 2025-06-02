import BaseButton, { type BaseButtonProps } from './BaseButton';
import clsx from 'clsx';

interface IconButtonProps extends BaseButtonProps {
  suppressNavigation?: boolean;
}

export default function IconButton({
  onClick,
  suppressNavigation,
  ...props
}: IconButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Check if the button is inside a link by looking at parent elements
    const isInsideLink = e.currentTarget.closest('a') !== null;

    if (isInsideLink) {
      e.preventDefault();
      e.stopPropagation();
    }
    onClick?.(e);
  };

  return (
    <BaseButton
      {...props}
      onClick={handleClick}
      className={clsx(
        styles.iconButton,
        props.disabled && styles.disabled,
        props.className
      )}
    >
      {props.children}
    </BaseButton>
  );
}

const styles = {
  iconButton: clsx('p-2'),
  disabled: clsx('opacity-50', 'pointer-events-none'),
};
