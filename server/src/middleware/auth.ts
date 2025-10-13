import { NextFunction, Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { UnauthorizedError } from '../types/errors';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new UnauthorizedError('No token provided'))
    }
    
    const token = authHeader.substring(7);
    
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return next(new UnauthorizedError('Invalid token'))
    }

    req.user = user;
    next();
  } catch (error) {
    next(error)
    // res.status(401).json({ error: 'Authentication failed' });
  }
};