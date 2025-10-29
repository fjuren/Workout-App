import { ErrorCode } from '@shared/types/errors';

// an extension to the Error class to add consistent error handling
export class ApiError extends Error {
  constructor(
    public code: ErrorCode,
    public statusCode: number,
    public message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'ApiError';
    Error.captureStackTrace?.(this, this.constructor); // supports better chaining on browser fyi
  }
}
