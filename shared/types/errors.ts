export enum ErrorCode {
  // auth errors
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',

  // validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_EMAIL = 'INVALID_EMAIL',
  WEAK_PASSWORD = 'WEAK_PASSWORD',

  // resource errors
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',

  // server errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
}

// standard error response
export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: Record<string, any>;
  timestamp?: string;
}

// default error messages
export const ErrorMessages: Record<ErrorCode, string> = {
  [ErrorCode.INVALID_CREDENTIALS]: 'Invalid email or password',
  [ErrorCode.UNAUTHORIZED]: 'You must be logged in to access this',
  [ErrorCode.TOKEN_EXPIRED]: 'Your session has expired. Please log in again.',
  [ErrorCode.VALIDATION_ERROR]: 'Please check your input and try again',
  [ErrorCode.MISSING_REQUIRED_FIELD]: 'Required field is missing',
  [ErrorCode.INVALID_EMAIL]: 'Please enter a valid email address',
  [ErrorCode.WEAK_PASSWORD]: 'Password must be at least 8 characters',
  [ErrorCode.NOT_FOUND]: 'Resource not found',
  [ErrorCode.ALREADY_EXISTS]: 'This resource already exists',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Something went wrong. Please try again.',
  [ErrorCode.DATABASE_ERROR]: 'Database error occurred',
  [ErrorCode.EXTERNAL_API_ERROR]: 'External service error',
};
