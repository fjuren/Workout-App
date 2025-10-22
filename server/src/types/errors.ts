import { ErrorCode } from '../../../shared/types/errors';

export class AppError extends Error {
  constructor(
    public message: string,
    public code: ErrorCode,
    public statusCode: number = 500,
    public isOperational: boolean = true,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, ErrorCode.VALIDATION_ERROR, 400, true, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized', details?: Record<string, any>) {
    super(message, ErrorCode.UNAUTHORIZED, 401, true, details);
  }
}

export class AuthorizationError extends AppError {
  constructor(
    message: string = 'Insufficient permissions',
    details?: Record<string, any>
  ) {
    super(message, ErrorCode.FORBIDDEN, 403, true, details);
  }
}

export class NotFoundError extends AppError {
  constructor(
    message: string = 'Resource not found',
    details?: Record<string, any>
  ) {
    super(message, ErrorCode.NOT_FOUND, 404, true, details);
  }
}

export class ConflictError extends AppError {
  constructor(
    message: string = 'Resource already exists',
    details?: Record<string, any>
  ) {
    super(message, ErrorCode.ALREADY_EXISTS, 409, true, details);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(
    message: string = 'Too many requests, please try again later',
    details?: Record<string, any>
  ) {
    super(message, ErrorCode.TOO_MANY_REQUESTS, 429, true, details);
  }
}

export class DatabaseError extends AppError {
  // original error to help capture errors from supabase fyi
  constructor(
    message: string,
    originalError: Error | { message: string },
    details?: Record<string, any>
  ) {
    super(message, ErrorCode.DATABASE_ERROR, 500, true, {
      original: originalError.message,
      ...details,
    });
  }
}
