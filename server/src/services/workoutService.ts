import { Workout } from '@shared/index';
import { supabase } from '../config/supabase';
import { DatabaseError, ValidationError } from '../types/errors';

// Get all quick (single-day) workouts for authenticated user
export const quickWorkouts = async (userId: string): Promise<Workout[]> => {
  // get all workouts // TODO any rules to limit how many workouts we pull??
  const { data: quickWorkoutData, error: quickWorkoutError } = await supabase
    .from('workouts')
    .select('*')
    .eq('user_id', userId);

  if (quickWorkoutError) {
    throw new DatabaseError(
      'Failed to fetch user quick workouts',
      quickWorkoutError
    );
  }
  return quickWorkoutData;
};

// Get relevant workout exercise from workout_exercises table
export const quickWorkoutExercise = async (
  userId: string,
  workoutId: string
) => {
  // get specific set of exercises for the workout
  const { data: quickWorkoutExerciseData, error: quickWorkoutExerciseError } =
    await supabase
      .from('workout_exercises')
      .select()
      .eq('workout_id', workoutId);

  if (quickWorkoutExerciseError) {
    throw new DatabaseError(
      'Failed to fetch workout exercise',
      quickWorkoutExerciseError
    );
  }

  return {
    workout_exercise: quickWorkoutExerciseData,
  };
};

// Create workout(s); based on sessions
export const acceptWorkout = async (
  userId: string,
  aiPlanData: any,
  workoutData: any
) => {
  // biz rule validation
  if (!workoutData.sessions || workoutData.sessions.length === 0) {
    throw new ValidationError('Workout must have at least one session');
  }

  // add plan to ai_plans table
  const { data: aiPlan, error: aiPlanError } = await supabase
    .from('ai_plans')
    .insert({
      user_id: userId,
      model: aiPlanData.model,
      input_summary: aiPlanData.input_summary,
      plan_json: aiPlanData.plan_json,
      status: aiPlanData.status,
      source_prompt: aiPlanData.source_prompt,
      seed: aiPlanData.seed,
    })
    .select()
    .single();

  if (aiPlanError) {
    throw new DatabaseError('Failed to add the AI plan to the db', aiPlanError);
  }

  // add workout to workouts table
  const { data: workout, error: workoutError } = await supabase
    .from('workouts')
    .insert({
      user_id: userId,
      date: workoutData.sessions[0].date,
      type: workoutData.sessions[0].type.toLowerCase(),
      title: workoutData.sessions[0].title,
      source: 'ai',
      ai_plan_id: aiPlan.id || null,
      status: 'planned',
      metadata: {
        week_start: workoutData.week_start,
        focus: workoutData.sessions[0].focus,
        total_time: workoutData.sessions[0].total_time,
        // warmup: workoutData.sessions.warmup, // TODO add post mvp
        // blocks: session.blocks
      },
    })
    .select()
    .single();

  if (workoutError) {
    console.error('Supabase workout error details:', {
      message: workoutError.message,
      details: workoutError.details,
      hint: workoutError.hint,
      code: workoutError.code,
    });
    // adding a rollback in case an error happens at the service layer, to improper prevent data entry
    await supabase.from('ai_plans').delete().eq('id', aiPlan.id);
    throw new DatabaseError('Failed to create workout', workoutError);
  }

  // add worout exercises; references the exercise library
  const exercisesInserts = workoutData.sessions.flatMap((session: any) =>
    session.blocks.map((block: any, index: number) => ({
      workout_id: workout.id,
      exercise_library_id: block.exercise_library_id,
      exercise_id: null, // TODO for when adding manual exercises maybe. placeholder for now
      sequence: index + 1,
      prescription_json: { sets: block.sets },
      // targets (pladeholder)
      // notes (placeholder)
    }))
  );

  const { error: exercisesError } = await supabase
    .from('workout_exercises')
    .insert(exercisesInserts);

  if (exercisesError) {
    console.error('Supabase workout error details:', {
      message: exercisesError.message,
      details: exercisesError.details,
      hint: exercisesError.hint,
      code: exercisesError.code,
    });
    // adding a rollback in case an error happens at the service layer, to improper prevent data entry
    await supabase.from('workouts').delete().eq('id', workout.id);
    await supabase.from('ai_plans').delete().eq('id', aiPlan.id);
    throw new DatabaseError(
      'Failed to create workout exercises',
      exercisesError
    );
  }

  return {
    ai_plan_id: aiPlan.id,
    workout_id: workout.id,
    // exercises_count: exercisesInserts.length,
  };
};

// Mark workout as complete
export const completeWorkout = async (workoutId: string) => {
  // biz rule validation

  const completedAt = new Date().toISOString();

  // update status field to 'completed' and add 'completed_at' date
  const { data, error } = await supabase
    .from('workouts')
    .update({ status: 'completed', completed_at: completedAt })
    .eq('id', workoutId)
    .select()
    .single();

  if (error) {
    throw new DatabaseError('Failed to update workout status', error);
  }
  console.log(data);

  return data;
};
