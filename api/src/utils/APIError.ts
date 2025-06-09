class APIError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public errors: string[],
    public stack: string = '',
    public data: any,
    public success: boolean = false
  ) {
    super(message);
    if (!stack) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { APIError };
