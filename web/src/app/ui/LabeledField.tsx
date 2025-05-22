interface LabeledFieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}

export default function LabeledField({
  label,
  htmlFor,
  children,
}: LabeledFieldProps) {
  return (
    <div className={`flex flex-col gap-2 mb-2`}>
      <label
        className="font-semibold"
        htmlFor={htmlFor}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
