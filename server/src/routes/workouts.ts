import express from 'express';
import { supabase } from '../config/supabase';
import { authenticate, AuthRequest } from '../middleware/auth';
import { DatabaseError } from '../types/errors';

const router = express.Router();

// Get all workouts for authenticated user
router.get('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', req.user.id);

    if (error) {
      return next(new DatabaseError('Failed to get workouts', error));
    }

    res.status(200).json(data);
  } catch (error: any) {
    next(error)
    // res.status(500).json({ error: 'Server error' });
  }
});

// Create workout
router.post('/', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { name, exercises, totalTime } = req.body;

    const { data, error } = await supabase
      .from('workouts')
      .insert({
        user_id: req.user.id,
        name,
        exercises,
        total_time: totalTime,
        complete: false,
      })
      .select()
      .single();

    if (error) {
      return next(new DatabaseError(
        'Failed to create workout',
        error,
      ));
    }

    res.status(201).json(data);
  } catch (error: any) {
    next(error)
  }
});

// // Update workout completion status
// router.patch('/:id/complete', authenticate, async (req: AuthRequest, res) => {
//   try {
//     const { id } = req.params;
//     const { complete } = req.body;

//     const { data, error } = await supabase
//       .from('workouts')
//       .update({ complete })
//       .eq('id', id)
//       .eq('user_id', req.user.id)
//       .select()
//       .single();

//     if (error) {
//       throw new ValidationError(error.message, {'Error details': error})
//       // return res.status(400).json({ error: error.message });
//     }

//     res.json(data);
//   } catch (error: any) {
//       throw new DatabaseError(error.message, error, {'Error details': error})

//     // res.status(500).json({ error: 'Server error' });
//   }
// });

export default router;
