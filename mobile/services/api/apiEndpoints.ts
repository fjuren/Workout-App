export const apiEndpoints = {
  // User
  // =====================
  user: {
    base: '/api/user',
    settings: '/api/user/profile-settings',
  },

  // Workouts
  // =====================
  workouts: {
    base: '/api/workouts',
    quickWorkouts: '/api/workouts/quick-workouts',
    quickWorkoutExercises: '/api/workouts/quick-workout-exercise',
    acceptWorkout: '/api/workouts/accept-workout',
    completeWorkout: '/api/workouts/complete-workout',
    byId: (id: string | number) => `/api/workouts/${id}`,
  },

  // AI Plans
  // =====================
  aiPlans: {
    base: '/api/ai-plans/generate-workout',
    generateSingle: '/api/ai-plans/generate-workout/single',
  },
} as const;
