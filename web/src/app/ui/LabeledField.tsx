import { createClassNames } from '../lib/utils';

interface LabeledFieldProps {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
  error?: string;
}

export default function LabeledField({
  children,
  label,
  htmlFor,
  error,
}: LabeledFieldProps) {
  const classes = createClassNames('flex', 'flex-col', 'gap-2', 'mb-2');
  return (
    <div className={classes}>
      <label
        className="font-semibold"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
