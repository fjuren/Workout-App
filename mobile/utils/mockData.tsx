export const useMockData = () => {
  return process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';
};

export const mockQuickWorkouts = [
  {
    id: "23a37c58-6b87-4957-a5be-152393171a41",
    created_at: "2025-10-18T07:19:35.083074+00:00",
    date: "2025-10-16",
    metadata: {
      focus: "Upper Body Strength",
      total_time: "40 minutes",
      week_start: "2025-10-14"
    },
    notes: null,
    rpe: null,
    scheduled_at: null,
    source: "ai",
    started_at: null,
    status: "planned",
    title: "Beginner Upper Body Builder",
    type: "strength",
    updated_at: "2025-10-18T07:19:35.083074+00:00",
    ai_plan_id: "9b1f6903-1612-458a-aa53-8107210f7d2b",
    user_id: "43deb80f-a559-4285-86b0-38e7288901e5"
  },
  {
    id: "34b48c69-8c98-5a68-b6cf-263404282b52",
    created_at: "2025-10-18T08:30:22.123456+00:00",
    date: "2025-10-17",
    metadata: {
      focus: "Lower Body Power",
      total_time: "35 minutes",
      week_start: "2025-10-14"
    },
    notes: null,
    rpe: null,
    scheduled_at: null,
    source: "ai",
    started_at: null,
    status: "completed",
    title: "Leg Day Blast",
    type: "strength",
    updated_at: "2025-10-18T08:30:22.123456+00:00",
    ai_plan_id: "9b1f6903-1612-458a-aa53-8107210f7d2a",
    user_id: "43deb80f-a559-4285-86b0-38e7288901e5"
  },
  {
    id: "45c59d7a-9da9-6b79-c7dg-374515393c63",
    created_at: "2025-10-18T09:15:10.987654+00:00",
    date: "2025-10-18",
    metadata: {
      focus: "Cardio Endurance",
      total_time: "25 minutes",
      week_start: "2025-10-14"
    },
    notes: null,
    rpe: null,
    scheduled_at: null,
    source: "ai",
    started_at: null,
    status: "planned",
    title: "Morning HIIT Session",
    type: "cardio",
    updated_at: "2025-10-18T09:15:10.987654+00:00",
    ai_plan_id: "9b1f6903-1612-458a-aa53-8107210f7d2c",
    user_id: "43deb80f-a559-4285-86b0-38e7288901e5"
  }
];

export const mockWorkoutExercises = [
  // Workout 1: Upper Body
  {
    id: "3c9bfa6a-7d73-430d-a893-eede95071847",
    workout_id: "23a37c58-6b87-4957-a5be-152393171a41",
    exercise_library_id: "bench_press",
    exercise_id: null,
    sequence: 1,
    prescription_json: {
      sets: [
        { rir: 2, reps: 8, rest_sec: 90, load_pct_1rm: 70 },
        { rir: 2, reps: 8, rest_sec: 90, load_pct_1rm: 70 },
        { rir: 2, reps: 8, rest_sec: 90, load_pct_1rm: 70 }
      ]
    },
    targets: {},
    notes: null,
    created_at: "2025-10-18T07:19:35.268762+00:00"
  },
  {
    id: "4d8cfa7b-8e84-541e-b904-fefe06182958",
    workout_id: "23a37c58-6b87-4957-a5be-152393171a41",
    exercise_library_id: "shoulder_press",
    exercise_id: null,
    sequence: 2,
    prescription_json: {
      sets: [
        { rir: 1, reps: 12, rest_sec: 60, load_pct_1rm: 60 },
        { rir: 1, reps: 12, rest_sec: 60, load_pct_1rm: 60 }
      ]
    },
    targets: {},
    notes: null,
    created_at: "2025-10-18T07:19:35.268762+00:00"
  },
  {
    id: "5e9dfb8c-9f95-652f-c015-0f0f17293069",
    workout_id: "23a37c58-6b87-4957-a5be-152393171a41",
    exercise_library_id: "bicep_curl",
    exercise_id: null,
    sequence: 3,
    prescription_json: {
      sets: [
        { rir: 1, reps: 15, rest_sec: 45, load_pct_1rm: 50 },
        { rir: 1, reps: 15, rest_sec: 45, load_pct_1rm: 50 }
      ]
    },
    targets: {},
    notes: null,
    created_at: "2025-10-18T07:19:35.268762+00:00"
  },
  
  // Workout 2: Lower Body
  {
    id: "6f0efc9d-af06-763g-d126-1g1g28304170",
    workout_id: "34b48c69-8c98-5a68-b6cf-263404282b52",
    exercise_library_id: "squat",
    exercise_id: null,
    sequence: 1,
    prescription_json: {
      sets: [
        { rir: 2, reps: 10, rest_sec: 120, load_pct_1rm: 75 },
        { rir: 2, reps: 10, rest_sec: 120, load_pct_1rm: 75 },
        { rir: 2, reps: 10, rest_sec: 120, load_pct_1rm: 75 }
      ]
    },
    targets: {},
    notes: null,
    created_at: "2025-10-18T08:30:22.268762+00:00"
  },
  {
    id: "7g1fgd0e-bg17-874h-e237-2h2h39415281",
    workout_id: "34b48c69-8c98-5a68-b6cf-263404282b52",
    exercise_library_id: "deadlift",
    exercise_id: null,
    sequence: 2,
    prescription_json: {
      sets: [
        { rir: 3, reps: 6, rest_sec: 150, load_pct_1rm: 80 },
        { rir: 3, reps: 6, rest_sec: 150, load_pct_1rm: 80 },
        { rir: 3, reps: 6, rest_sec: 150, load_pct_1rm: 80 }
      ]
    },
    targets: {},
    notes: null,
    created_at: "2025-10-18T08:30:22.268762+00:00"
  },
  {
    id: "8h2ghd1f-ch28-985i-f348-3i3i40526392",
    workout_id: "34b48c69-8c98-5a68-b6cf-263404282b52",
    exercise_library_id: "leg_press",
    exercise_id: null,
    sequence: 3,
    prescription_json: {
      sets: [
        { rir: 1, reps: 12, rest_sec: 90, load_pct_1rm: 65 },
        { rir: 1, reps: 12, rest_sec: 90, load_pct_1rm: 65 }
      ]
    },
    targets: {},
    notes: null,
    created_at: "2025-10-18T08:30:22.268762+00:00"
  },

  // Workout 3: Cardio HIIT
  {
    id: "9i3ihe2g-di39-096j-g459-4j4j516374a3",
    workout_id: "45c59d7a-9da9-6b79-c7dg-374515393c63",
    exercise_library_id: "burpees",
    exercise_id: null,
    sequence: 1,
    prescription_json: {
      sets: [
        { rir: 0, reps: 20, rest_sec: 30, load_pct_1rm: 0 },
        { rir: 0, reps: 20, rest_sec: 30, load_pct_1rm: 0 },
        { rir: 0, reps: 20, rest_sec: 30, load_pct_1rm: 0 }
      ]
    },
    targets: {},
    notes: null,
    created_at: "2025-10-18T09:15:10.268762+00:00"
  },
  {
    id: "0j4jif3h-ej40-107k-h560-5k5k627485b4",
    workout_id: "45c59d7a-9da9-6b79-c7dg-374515393c63",
    exercise_library_id: "mountain_climbers",
    exercise_id: null,
    sequence: 2,
    prescription_json: {
      sets: [
        { rir: 0, reps: 30, rest_sec: 30, load_pct_1rm: 0 },
        { rir: 0, reps: 30, rest_sec: 30, load_pct_1rm: 0 }
      ]
    },
    targets: {},
    notes: null,
    created_at: "2025-10-18T09:15:10.268762+00:00"
  },
  {
    id: "1k5kjg4i-fk51-218l-i671-6l6l738596c5",
    workout_id: "45c59d7a-9da9-6b79-c7dg-374515393c63",
    exercise_library_id: "jumping_jacks",
    exercise_id: null,
    sequence: 3,
    prescription_json: {
      sets: [
        { rir: 0, reps: 40, rest_sec: 30, load_pct_1rm: 0 },
        { rir: 0, reps: 40, rest_sec: 30, load_pct_1rm: 0 }
      ]
    },
    targets: {},
    notes: null,
    created_at: "2025-10-18T09:15:10.268762+00:00"
  }
];