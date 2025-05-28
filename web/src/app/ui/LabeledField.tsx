import { clsx } from 'clsx';

interface LabeledFieldProps {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
}

export default function LabeledField({
  children,
  label,
  htmlFor,
  error,
  className,
}: LabeledFieldProps) {
  return (
    <div className={clsx(styles.labeledField, className)}>
      <label
        className={styles.label}
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}

const styles = {
  error: clsx('text-red-500', 'text-sm', 'mt-1'),
  labeledField: clsx('flex', 'flex-col', 'gap-2', 'mb-2'),
  label: clsx('font-semibold'),
};
