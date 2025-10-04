import express from 'express';
import { supabase } from '../config/supabase';
import { ConflictError, ValidationError } from '../types/errors';

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password) {
      throw new ValidationError('Email and password are required', {
        fields: { email: !email, password: !password },
      });
    }

    if (password.length < 8) {
      throw new ValidationError('Password must be at least 8 characters', {
        field: 'password',
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      if (error.message.includes('already registered')) {
        throw new ConflictError('Email already exists');
      }
      throw new ValidationError(error.message);
    }

    res.json({ user: data.user, session: data.session });
  } catch (error) {
    next(error);
  }
});

router.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new ValidationError('Invalid email or password');
    }

    res.json({ user: data.user, session: data.session });
  } catch (error) {
    next(error);
  }
});

export default router;
