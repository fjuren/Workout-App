import { ErrorCode } from '../../shared/types/errors';

/**
 * Messaging for users (friendly wording)
 * - Empathetic and friendly tone
 * - CTA based
 * - Avoids technical jargon
 * - Appropriate for displaying in UI dialogs/toasts
 */

export const errorTitle = 'Error'

export const UserErrorMessages: Record<ErrorCode, string> = {
  // auth
  [ErrorCode.INVALID_CREDENTIALS]: 'Your email or password is incorrect. Please try again.',
  [ErrorCode.UNAUTHORIZED]: 'Please log in to continue.',
  [ErrorCode.TOKEN_EXPIRED]: 'Your session has expired. Please log in again.',
  [ErrorCode.FORBIDDEN]: "You don't have permission to do that.",
  
  // validation
  [ErrorCode.VALIDATION_ERROR]: 'Please check your information and try again.',
  [ErrorCode.MISSING_REQUIRED_FIELD]: 'Please fill in all required fields.',
  [ErrorCode.INVALID_EMAIL]: 'Please enter a valid email address.',
  [ErrorCode.WEAK_PASSWORD]: 'Your password must be at least 8 characters long.',
  
  // resources
  [ErrorCode.NOT_FOUND]: "We couldn't find what you're looking for.",
  [ErrorCode.ALREADY_EXISTS]: 'This already exists. Please try something different.',
  
  // server
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Something went wrong on our end. Please try again in a moment.',
  [ErrorCode.DATABASE_ERROR]: "We couldn't save your changes right now. Please try again.",
  [ErrorCode.EXTERNAL_API_ERROR]: "We're having trouble connecting to our services. Please try again later.",
};

export const getUserErrorMessage = (
  code: ErrorCode | string,
  fallbackMessage?: string
): string => {
  if (code in UserErrorMessages) {
    return UserErrorMessages[code as ErrorCode];
  }
//   fallback message is optional if something more specific to context is needed 
  return fallbackMessage || 'Something unexpected happened. Please try again.';
};