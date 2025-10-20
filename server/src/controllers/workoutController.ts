import { AuthRequest } from '../middleware/auth';
import * as workoutService from '../services/workoutService';
import { AuthorizationError, ValidationError } from '../types/errors';

// Get all quick (single-day) workouts for authenticated user
export const quickWorkouts = async (req: AuthRequest, res: any, next: any) => {
  try { 
    const userId = req.user?.id;

    if (!userId) {
      return next(new AuthorizationError('User not authorized'));
    }

    const result = await workoutService.quickWorkouts(userId)

    res.status(200).json(result)
   } catch (error) {
    next(error)
   }
}

// Get relevant workout exercise from workout_exercises table
export const quickWorkoutExercise = async (req: AuthRequest, res: any, next: any) => {
  try { 
    const userId = req.user?.id as string;
    const workoutId = req.query.workoutId as string
    console.log(workoutId)

    if (!userId) {
      return next(new AuthorizationError('User not authorized'));
    }

    if (!workoutId) {
      return next(new ValidationError('Workout not found'))
    }


    const result = await workoutService.quickWorkoutExercise(userId, workoutId)

    res.status(200).json(result)
   } catch (error) {
    next(error)
   }
}

// Create workout(s); based on sessions
export const acceptWorkout = async (req: AuthRequest, res: any, next: any) => {
  try {
    const { aiGeneratedPlan, generatedWorkout } = req.body;
    
    if (!aiGeneratedPlan || !generatedWorkout) {
      return next(new ValidationError('Missing required fields'));
    }

    const userId = req.user?.id;

    if (!userId) {
      return next(new AuthorizationError('User not authorized'));
    }

    const result = await workoutService.acceptWorkout(userId, aiGeneratedPlan, generatedWorkout);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};