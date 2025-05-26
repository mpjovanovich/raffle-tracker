// Creates a class name string from a list of class names.
// Keeps our code clean and readable.
export const createClassNames = (...classes: (string | false | undefined)[]) =>
  // This coerces each item in the list to a boolean, then only includes the
  // ones that are true. It's leveraging truthy logic.
  classes.filter(Boolean).join(' ');
