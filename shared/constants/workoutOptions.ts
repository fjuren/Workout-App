// used in workout creation
export const WORKOUT_OPTS = {
  sessionFocus: ['Upper Body', 'Lower Body', 'Full Body'],
  sessionType: ['Strength', 'Bodyweight', 'Powerlifting'],
  skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
  intensityLevels: ['Low', 'Medium', 'High'],
  durationOptions: ['< 30 min', '30–60 min', '> 60 min'],
  enduranceSport: ['None', 'Running', 'Cycling', 'Swimming'],
  durationWeekOptions: ['1 week', '2 weeks', '4 weeks', 'Custom'],
} as const;
