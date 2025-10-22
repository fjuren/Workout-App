import { supabase } from '../config/supabase';
import { DatabaseError, ValidationError } from '../types/errors';

export const getExerciseLibrary = async () => {
  const { data: exercises, error } = await supabase
    .from('exercise_library')
    .select('id, name, equipment_types, primary_muscles, tags')
    .is('deprecated_at', null)
    .order('name');

  if (error) {
    throw new DatabaseError('Failed to fetch exercise library from db', error);
  }

  if (!exercises || exercises.length === 0) {
    throw new ValidationError('No exercises found in database');
  }
  console.log(exercises);
  // Rename database format into usable format
  const exerciseLibraryRenamed = exercises.map((row) => ({
    id: row.id,
    name: row.name,
    equipment: row.equipment_types,
    muscles: row.primary_muscles,
    level: row.tags.level || 'beginner',
  }));

  return exerciseLibraryRenamed;
};
