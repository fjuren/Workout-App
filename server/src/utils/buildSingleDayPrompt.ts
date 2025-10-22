// mocking data until it's available in db
export const EQUIPMENT_TYPES = [
  // Bodyweight
  'bodyweight',

  // Free Weights
  'barbell',
  'dumbbells',
  'kettlebell',
  'ez_bar',

  // Machines
  'cable_machine',
  'leg_press',
  'leg_curl_machine',
  'leg_extension_machine',
  'chest_press_machine',
  'lat_pulldown_machine',
  'rowing_machine',
  'smith_machine',

  // Equipment/Accessories
  'bench',
  'rack',
  'pull_up_bar',
  'dip_station',
  'resistance_bands',
  'stability_ball',
  'medicine_ball',
  'box',
  'trx',
];

export const buildSingleDayPrompt = (params: any) => {
  const {
    focus,
    type,
    skill,
    intensity,
    duration,
    notes,
    userProfileMetaData = {},
    exerciseLibrary,
  } = params;
  const {
    equipment = EQUIPMENT_TYPES,
    goals = [],
    constraints = [],
    max_hr,
  } = userProfileMetaData;
  console.log('EXERCISELIBRARY: ', exerciseLibrary);

  // TODO Update types
  // considers only exercises based on user profile info (ie available equipment) and specified skill level from workout selections
  const availableExercises = exerciseLibrary.filter((ex: any) => {
    // if no equipment
    if (equipment.length === 0) {
      return ex.equipment.includes('bodyweight');
    }

    // checks if user has the required equipment
    const hasEquipment = ex.equipment.some(
      (eq: any) => equipment.includes(eq) || eq === 'bodyweight'
    );

    const matchesLevel =
      ex.level === 'beginner' ||
      (skill === 'intermediate' && ex.level === 'intermediate') ||
      skill === 'advanced';

    return hasEquipment && matchesLevel;
  });

  const exerciseList = availableExercises
    .map(
      (ex: any) =>
        `- ${ex.name} (ID: ${ex.id}, Equipment: ${ex.equipment.join(
          '/'
        )}, Muscles: ${ex.muscles.join('/')})`
    )
    .join('\n');

  return `Generate a single ${duration}-minute ${type} workout with the following parameters:

Focus: ${focus}
Skill Level: ${skill}
Intensity: ${intensity}
Available Equipment: ${equipment.join(', ') || 'bodyweight only'}

User Goals: ${goals.join(', ') || 'general fitness'}
${
  constraints.length > 0
    ? `Constraints/Limitations: ${constraints.join(', ')}`
    : ''
}
${notes ? `Additional Notes: ${notes}` : ''}

AVAILABLE EXERCISES (you MUST use only these exercises and their exact IDs):
${exerciseList}

CRITICAL INSTRUCTIONS:
- This is a SINGLE-DAY workout, so create exactly ONE session in the sessions array
- The session date should be today's date
- Include ONE warmup section for the entire workout
- Include multiple exercises in the blocks array (not multiple sessions)
- For each exercise in the workout blocks, you MUST use the exact "exercise_library_id" from the list above
- Only include exercises that match the available equipment
- Choose exercises appropriate for the user's skill level
- The exercise "name" field should match the name from the library
- Ensure the total workout time (warmup + all blocks) matches the requested duration

Create a complete workout plan with warmup and structured exercise blocks.`;
};
// recall other params available, maybe consider
// ${max_hr ? `Max Heart Rate: ${max_hr} bpm` : ''}
