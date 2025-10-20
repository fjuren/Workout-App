export type Workout = {
  id: string;
  ai_plan_id: string;
  user_id: string;
  created_at: string;
  date: string;
  metadata: {
    focus: string;
    total_time: string;
    week_start: string;
  } | null;
  notes: string | null;
  rpe: number | null;
  scheduled_at: string | null;
  source: string;
  started_at: string | null;
  status: string;
  title: string;
  type: string;
  updated_at: string;
};

export type ExerciseSet = {
  rir: number;
  reps: number;
  rest_sec: number;
  load_pct_1rm: number;
};

export type PrescriptionJson = {
  sets: ExerciseSet[];
};

export type WorkoutExercise = {
  id: string;
  workout_id: string;
  exercise_library_id: string;
  exercise_id: string | null;
  sequence: number;
  prescription_json: PrescriptionJson;
  targets: Record<string, any>;
  notes: string | null;
  created_at: string;
};