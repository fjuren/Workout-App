import { Workout } from '@/types/workouts';
import { apiEndpoints } from './api/apiEndpoints';
import { apiAuthedCall } from './api/client';

// fyi apiAuthedCall is a helper to handle checking whether the user is authenticated, calls endpoint & handles api related errors

export const getQuickWorkouts = async (): Promise<Workout[]> => {
  const data = await apiAuthedCall<Workout[]>(
    apiEndpoints.workouts.quickWorkouts
  );
  return data;
};

interface AcceptWorkoutResponse {
  ai_plan_id: string;
  workout_id: string;
}

export const acceptWorkoutData = async (
  options: RequestInit
  // Recall what RequestInit is:
  //   interface RequestInit {
  //   method?: string;
  //   headers?: HeadersInit;
  //   body?: BodyInit | null;
  //   ...
  // }
): Promise<AcceptWorkoutResponse> => {
  const data = await apiAuthedCall<AcceptWorkoutResponse>(
    apiEndpoints.workouts.acceptWorkout,
    options
  );
  return data;
};
