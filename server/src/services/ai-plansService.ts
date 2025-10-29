import dotenv from 'dotenv';
import OpenAI from 'openai';
import { WorkoutOptionTypes } from '../../../shared/types/workoutOptions';
import { workoutPlanSchema } from '../types/workoutPlanSchema';
import { buildSingleDayPrompt } from '../utils/buildSingleDayPrompt';
import { getExerciseLibrary } from '../utils/getExerciseLibrary';
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const single = async (
  userId: string,
  focus: WorkoutOptionTypes['sessionFocus'],
  type: WorkoutOptionTypes['sessionType'],
  skill: WorkoutOptionTypes['skillLevels'],
  intensity: WorkoutOptionTypes['intensityLevels'],
  duration: WorkoutOptionTypes['durationOptions'],
  notes: string,
  userProfileMetaData: Record<string, string>
) => {
  // get the exercise library (from exercises_libarry in db) for ai builder
  const exerciseLibrary = await getExerciseLibrary();

  // create a prompt for openAI
  const prompt = buildSingleDayPrompt({
    focus,
    type,
    skill,
    intensity,
    duration,
    notes,
    userProfileMetaData,
    exerciseLibrary,
  });
  console.log('AI PROMPT: ', prompt);

  const response = await client.responses.create({
    // note: moved from gpt-5-nano to 4o-mini due to poorer accuracy from nano while 4o-mini is still relatively cheap. 4o-mini docs: https://platform.openai.com/docs/models/gpt-4o-mini
    model: 'gpt-4o-mini-2024-07-18',
    instructions: `You are an expert fitness trainer who creates personalized workout plans.
  Generate a comprehensive single-day workout plan based on the user's parameters.

  Key guidelines:
  - Include a proper warmup (5 minutes)
  - Structure exercises in blocks with appropriate sets, reps, and rest periods
  - Use RIR (Reps in Reserve) for intensity guidance
  - Include load percentages based on 1RM when appropriate
  - Ensure total workout time matches the requested duration
  - Match the workout to the user's skill level and goals`,
    input: prompt,
    text: {
      format: {
        type: 'json_schema',
        name: 'workout_plan',
        schema: workoutPlanSchema,
      },
    },
    store: false, // can flag not to store data for privacy considerations
    // temperature: 0.7, // unsupported now; #TODO research how much of an impact this might have of responses; i.e., does it make workouts very similar each time? does it make it random??
  });

  const workoutPlan = JSON.parse(response.output_text);

  workoutPlan.model = response.model;
  workoutPlan.source_prompt = prompt;
  workoutPlan.version = 1;
  workoutPlan.status = 'final';
  // console.log('WORKOUT PLAN RESPONSE', workoutPlan);
  // console.log(
  //   'WORKOUT PLAN RESPONSE PLAN_JSON.Weeks',
  //   workoutPlan.plan_json.weeks
  // );
  return workoutPlan;
};
