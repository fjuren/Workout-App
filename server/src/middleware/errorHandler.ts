import { NextFunction, Request, Response } from 'express';
import { AppError } from '../types/errors';

export const errorHandler = ( err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      code: err.code,
      details: err.details
    });
  }

  if (err instanceof Error) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message
    });
  }

  // when none of the pre-handled errors are defined/identifies, this is the 500 fallback
  res.status(500).json({
    error: 'Internal server error',
    message: String(err)
  });
}
