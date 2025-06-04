import { useEffect, useState } from 'react';
import { FieldValues, useForm, UseFormProps } from 'react-hook-form';

/*
 * This is a wrapper around useForm that exposes a boolean flag indicating
 * whether the form has been initialized.
 */
export function useInitializedForm<T extends FieldValues>(
  options: UseFormProps<T>
) {
  const [isInitialized, setIsInitialized] = useState(false);

  const form = useForm({
    ...options,
    // This tells useForm not to keep the form values in state.
    // I don't fully understand it but it's supposed to be better for performance
    // and to not have stale values.
    shouldUnregister: true,
  });

  // After the component mounts, the form is initialized.
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Return the "useForm" form and the initialized flag.
  return {
    ...form,
    isInitialized,
  };
}
