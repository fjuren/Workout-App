import express from 'express';
import { supabase } from '../config/supabase';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Get all workouts for authenticated user
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', req.user.id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create workout
router.post('/', authenticate, async (req: AuthRequest, res) => {
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
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update workout completion status
router.patch('/:id/complete', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { complete } = req.body;

    const { data, error } = await supabase
      .from('workouts')
      .update({ complete })
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
