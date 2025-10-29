// import { ErrorCode } from '@shared/index';
import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '../../../shared/index';
import { AppError } from '../types/errors';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        ...(err.details && { details: err.details }),
      },
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      error: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      },
    });
  }

  // when none of the pre-handled errors are defined/identifies, this is the 500 fallback
  res.status(500).json({
    error: {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    },
  });
};
