import { bodyFont } from '../fonts';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({
  className,
  type,
  name,
  value,
  onChange,
  placeholder,
}: InputProps) {
  // const appliedClassName = `rounded-md px-4 py-2 bg-light-accent focus:bg-light-primary border border-light-accent2 outline-active ${bodyFont.className} ${className}`;
  let appliedClassName = `rounded-md px-4 py-2 bg-light-accent focus:bg-light-primary border border-light-accent2 outline-active ${bodyFont.className}`;
  if (type === 'date') {
    appliedClassName += ' self-start';
  }
  if (className) {
    appliedClassName += ' ' + className;
  }
  return (
    <input
      className={appliedClassName}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
