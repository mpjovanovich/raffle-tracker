import { bodyFont } from '../fonts';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  let appliedClassName = `rounded-md px-4 py-2 bg-light-accent focus:bg-light-primary border border-light-accent2 outline-active ${bodyFont.className}`;
  if (props.type === 'date') {
    appliedClassName += ' self-start';
  }
  if (props.className) {
    appliedClassName += ' ' + props.className;
  }
  return (
    <input
      ref={ref}
      {...props}
      className={appliedClassName}
    />
  );
});

Input.displayName = 'Input';

export default Input;
