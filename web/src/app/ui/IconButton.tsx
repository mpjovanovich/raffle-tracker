import BaseButton, {
  type ButtonProps,
  type BaseButtonProps,
} from './BaseButton';
import clsx from 'clsx';

export default function IconButton({ onClick, ...props }: BaseButtonProps) {
  let newProps: BaseButtonProps = props;

  if (!('href' in props)) {
    // We want to prevent the default behavior, which would navigate to the link
    // when the user clicks the button. This is for, e.g., a "delete" button
    // sitting inside a link (html anchor tag).
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // We should only prevent navigation if it's not actually a link.
      // We may have a link sitting on another link - we want to follow it in this case.
      e.preventDefault();
      e.stopPropagation();
      onClick?.(e);
    };
    newProps = {
      ...(newProps as ButtonProps),
      onClick: handleClick,
    };
  }

  return (
    <BaseButton
      {...newProps}
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
