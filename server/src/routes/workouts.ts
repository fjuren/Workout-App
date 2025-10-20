import express from 'express';
import * as workoutController from '../controllers/workoutController';
import { authenticate } from '../middleware/auth';


const router = express.Router();

// Get all quick (single-day) workouts for authenticated user
router.get('/quick-workouts', authenticate, workoutController.quickWorkouts)
// router.get('/single-day-workout', authenticate, async (req: AuthRequest, res, next) => {
//   try {
//     const { data, error } = await supabase
//       .from('workouts')
//       .select('*')
//       .eq('user_id', req.user.id);

//     if (error) {
//       return next(new DatabaseError('Failed to get workouts', error));
//     }

//     res.status(200).json(data);
//   } catch (error: any) {
//     next(error)
//     // res.status(500).json({ error: 'Server error' });
//   }
// });

// Get relevant workout exercise from workout_exercises table
router.get('/quick-workout-exercise', authenticate, workoutController.quickWorkoutExercise)

// Create workout(s); based on sessions
router.post('/accept-workout', authenticate, workoutController.acceptWorkout)
// router.post('/', authenticate, async (req: AuthRequest, res, next) => {
//   try {
//     const { week_start, sessions, ai_plan_id } = req.body;
//     console.log(ai_plan_id)

//     // create workout object; this will include the exercises (warmups and blocks most importantly) as part of the metadata
//     const insertWorkouts = sessions.map((session: any) => ({
      // user_id: req.user.id,
      // date: session.date,
      // type: session.type,
      // title: session.title,
      // source: 'ai',
      // ai_plan_id: ai_plan_id || null,
      // status: 'planned',
      // metadata: {
      //   week_start: week_start,
      //   focus: session.focus,
      //   total_time: session.total_time,
      //   warmup: session.warmup,
      //   // blocks: session.blocks
      // }
//     }));

//     const { data, error } = await supabase
//       .from('workouts')
//       .insert(insertWorkouts
//     // id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
//     // user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//     // date DATE NOT NULL,
//     // scheduled_at TIMESTAMPTZ,
//     // started_at TIMESTAMPTZ,
//     // completed_at TIMESTAMPTZ,
//     // type workout_type NOT NULL,
//     // title TEXT NOT NULL,
//     // source workout_source NOT NULL,
//     // status workout_status DEFAULT 'planned',
//     // notes TEXT,
//     // rpe SMALLINT CHECK (rpe >= 1 AND rpe <= 10),
//     // metadata JSONB DEFAULT '{}',
//     // ai_plan_id UUID REFERENCES ai_plans(id) ON DELETE SET NULL,
//     // created_at TIMESTAMPTZ DEFAULT NOW(),
//     // updated_at TIMESTAMPTZ DEFAULT NOW()
//       )
//       .select()
//       .single()

//     if (error) {
//       return next(new DatabaseError(
//         'Failed to add workout to db',
//         error,
//       ));
//     }

//     // res.status(201).json(data);
//   } catch (error: any) {
//     next(error)
//   }
// });

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
