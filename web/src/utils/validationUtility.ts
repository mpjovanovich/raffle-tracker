// TODO: Should be moved to a shared validation utility So that frontend and backend use the same validation rules.
export const userValidationRules = {
  username: {
    required: 'Username is required',
    minLength: {
      value: 5,
      message: 'Username must be at least 5 characters long',
    },
    maxLength: {
      value: 20,
      message: 'Username must be no more than 20 characters long',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
  },
} as const;
