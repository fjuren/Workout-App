import { WORKOUT_OPTS } from '@shared/constants/workoutOptions';

export type WorkoutOptionTypes = {
  [K in keyof typeof WORKOUT_OPTS]: (typeof WORKOUT_OPTS)[K][number];
};
