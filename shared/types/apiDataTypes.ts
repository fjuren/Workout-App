// ENUMS (added to DB)

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
  Deleted = 'deleted',
}

export enum UnitSystem {
  Metric = 'metric',
  Imperial = 'imperial',
}

export enum ExerciseModality {
  Strength = 'strength',
  Endurance = 'endurance',
}

export enum MovementPattern {
  Squat = 'squat',
  Hinge = 'hinge',
  Push = 'push',
  Pull = 'pull',
  Carry = 'carry',
  Other = 'other',
}

export enum CreatedByType {
  User = 'user',
  AI = 'ai',
  Admin = 'admin',
}

export enum WorkoutType {
  Strength = 'strength',
  Endurance = 'endurance',
  Mixed = 'mixed',
}

export enum WorkoutSource {
  AI = 'ai',
  Manual = 'manual',
  Template = 'template',
}

export enum WorkoutStatus {
  Planned = 'planned',
  InProgress = 'in_progress',
  Completed = 'completed',
  Skipped = 'skipped',
}

export enum PlanStatus {
  Draft = 'draft',
  Final = 'final',
}

// ROOT INTERFACES

export interface Equipment {
  [key: string]: boolean; // e.g., { "barbell": true, "rack": true }
}

export interface Availability {
  [day: string]: {
    minutes: number;
  }; // e.g., { "mon": { "minutes": 60 }, "wed": { "minutes": 45 } }
}

export interface Goals {
  endurance?: string;
  strength?: string;
  [key: string]: string | undefined;
}

export interface Constraints {
  injuries?: string[];
  [key: string]: any;
}

export interface ExerciseTags {
  level?: string;
  category?: string[];
  [key: string]: any;
}

export interface MediaContent {
  video_url?: string;
  image_url?: string;
  demo_url?: string;
  [key: string]: any;
}

export interface SetPrescription {
  reps?: number;
  load_pct_1rm?: number;
  rir?: number;
  tempo?: string;
  rest_sec?: number;
  hold_seconds?: number;
  [key: string]: any;
}

export interface PrescriptionJson {
  sets?: SetPrescription[];
  [key: string]: any;
}

export interface Targets {
  target_weight?: number;
  target_reps?: number;
  target_rpe?: number;
  [key: string]: any;
}

export interface WarmupExercise {
  name: string;
  duration_sec?: number;
  reps?: number;
  notes?: string;
}

export interface Warmup {
  duration_minutes: number;
  exercises: WarmupExercise[];
}

export interface WorkoutBlock {
  exercise_library_id?: string;
  name: string;
  sets: SetPrescription[];
}

export interface WorkoutSession {
  date: string;
  type: string;
  title: string;
  focus?: string;
  total_time?: string;
  warmup?: Warmup;
  blocks: WorkoutBlock[];
}

export interface PlanWeek {
  week_start: string;
  sessions: WorkoutSession[];
}

export interface PlanJson {
  plan_type?: string;
  duration_days?: number;
  weeks: PlanWeek[];
  [key: string]: any;
}

export interface InputSummary {
  goal?: string;
  experience_level?: string;
  available_time?: string;
  equipment?: string[];
  availability?: {
    days?: number;
  };
  [key: string]: any;
}

export interface WorkoutMetadata {
  focus?: string;
  total_time?: string;
  warmup?: Warmup;
  template_id?: string;
  week_number?: string;
  [key: string]: any;
}

// TABLE INTERFACES

export interface ProfileSettings {
  id: string;
  user_id: string;
  units: UnitSystem;
  max_hr: number | null;
  ftp: number | null;
  threshold_pace_sec_per_km: number | null;
  equipment: Equipment;
  availability: Availability;
  goals: Goals;
  constraints: Constraints;
  effective_from: string;
  effective_to: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExerciseLibrary {
  id: string; // slug like 'squat_back_barbell'
  name: string;
  modality: ExerciseModality;
  equipment_types: string[];
  movement_pattern: MovementPattern | null;
  primary_muscles: string[];
  secondary_muscles: string[];
  tags: ExerciseTags;
  media: MediaContent;
  created_by: CreatedByType;
  version: number;
  deprecated_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Workout {
  id: string;
  user_id: string;
  date: string;
  scheduled_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  type: WorkoutType;
  title: string;
  source: WorkoutSource;
  status: WorkoutStatus;
  notes: string | null;
  rpe: number | null; // 1-10
  metadata: WorkoutMetadata;
  ai_plan_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkoutExercise {
  id: string;
  workout_id: string;
  exercise_library_id: string | null; // References exercise_library.id
  exercise_id: string | null; // references exercises.id (for custom variants)
  exercise_name: string | null; // For free-form AI exercises
  sequence: number;
  prescription_json: PrescriptionJson;
  targets: Targets;
  notes: string | null;
  created_at: string;
}

export interface AiPlan {
  id: string;
  user_id: string;
  model: string;
  input_summary: InputSummary;
  plan_json: PlanJson;
  status: PlanStatus;
  source_prompt: string | null;
  seed: number | null;
  version: number;
  errors: Record<string, any>;
  created_at: string;
  updated_at: string;
}
