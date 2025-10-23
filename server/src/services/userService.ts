import { supabase } from '../config/supabase';
import { DatabaseError } from '../types/errors';

// Get all quick (single-day) workouts for authenticated user
// export const getProfileSettings = async (userId: string) => {
//   // get profile settings
//   const { data: profileSettings, error: profileSettingsError } = await supabase
//     .from('profile_settings')
//     .select('*');

//   if (profileSettingsError) {
//     throw new DatabaseError(
//       'Failed to fetch user profile settings. Please try again later',
//       profileSettingsError
//     );
//   }

//   return profileSettings;
// };

// Create workout(s); based on sessions
export const saveProfileSettings = async (userId: string, profileData: any) => {
  // biz rule validation
  //   if (!workoutData.sessions || workoutData.sessions.length === 0) {
  //     throw new ValidationError('Workout must have at least one session');
  //   }

  // save profile settings
  const { data, error } = await supabase.from('profile_settings').upsert(
    {
      user_id: userId,
      units: profileData.units,
      equipment: profileData.equipment, // includes equipment name & 1RM of equipment
      goals: profileData.goals,
      constraints: profileData.constraints,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: 'user_id',
    }
  );

  if (error) {
    console.log(error.details, error.message);
    throw new DatabaseError(
      'Failed to save user profile settings to profile_settings',
      error
    );
  }

  return { message: 'Success', data };
};
