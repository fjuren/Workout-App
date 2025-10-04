export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  restTime: string;
}

export interface Workout {
  id?: string;
  user_id?: string;
  name: string;
  totalTime: string;
  complete: boolean;
  exercises: Exercise[];
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  session: {
    access_token: string;
    refresh_token: string;
  };
}
