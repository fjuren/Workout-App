import express from 'express';
import * as workoutController from '../controllers/workoutController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Get all quick (single-day) workouts for authenticated user
router.get('/quick-workouts', authenticate, workoutController.quickWorkouts);

// Get relevant workout exercise from workout_exercises table
router.get(
  '/quick-workout-exercise',
  authenticate,
  workoutController.quickWorkoutExercise
);

// Create workout(s); based on sessions
router.post('/accept-workout', authenticate, workoutController.acceptWorkout);

export default router;
