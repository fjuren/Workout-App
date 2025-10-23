export type User = {
  id: string;
  email: string;
  auth_provider_id: string | null;
  name: string | null;
  locale: string;
  status: 'active' | 'inactive' | 'deleted';
  created_at: string;
  updated_at: string;
};

export type ProfileSettings = {
  id: string;
  user_id: string;
  units: 'metric' | 'imperial';
  max_hr: number | null;
  ftp: number | null;
  threshold_pace_sec_per_km: number | null;
  equipment: Record<string, any>;
  availability: Record<string, any>;
  goals: string[];
  constraints: string[];
  effective_from: string;
  effective_to: string | null;
  created_at: string;
  updated_at: string;
};
