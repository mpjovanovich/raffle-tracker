class APIResponse {
  constructor(
    public statusCode: number,
    public data: unknown,
    public message: string = '',
    public success: boolean = statusCode < 400
  ) {}
}

export { APIResponse };
