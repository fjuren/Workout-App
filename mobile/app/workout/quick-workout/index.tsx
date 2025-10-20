import CustomSegmentedButton from '@/components/CustomSegmentedButtons';
import ErrorDialog from '@/components/ErrorDialog';
import SectionLabel from '@/components/SectionLabel';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { supabase } from '@/config/supabase';
import { WORKOUT_OPTS } from '@/constants/constants';
import { useAppTheme } from '@/hooks/use-app-theme';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';


const fakeAiApiResponse = {
  id: "f2c6a0b3-9e48-4d52-9d6e-7b4f4a02c7df",
  model: "gpt-4-turbo",
  input_summary: {
    goal: "build upper body strength",
    experience_level: "beginner",
    available_time: "40 minutes",
    equipment: ["bench", "barbell", "dumbbells"]
  },
  plan_json: {
    plan_type: "quick",
    duration_days: 1,
    weeks: [
      {
        week_start: "2025-10-14",
        sessions: [
          {
            date: "2025-10-16",
            type: "strength",
            title: "Beginner Upper Body Builder",
            focus: "Upper Body Strength",
            total_time: "40 minutes",
            warmup: {
              duration_minutes: 5,
              exercises: [
                {
                  name: "Arm Circles",
                  duration_sec: 30,
                  notes: "Forward and backward"
                },
                {
                  name: "Band Pull-Aparts",
                  reps: 15,
                  notes: "Light resistance"
                },
                {
                  name: "Push-ups",
                  reps: 10,
                  notes: "Bodyweight, controlled tempo"
                },
                {
                  name: "Scapular Retractions",
                  reps: 12,
                  notes: "Focus on squeezing shoulder blades"
                }
              ]
            },
            blocks: [
              {
                exercise_library_id: "bench_press",
                name: "Bench Press",
                sets: [
                  { reps: 8, load_pct_1rm: 70, rir: 2, rest_sec: 90 },
                  { reps: 8, load_pct_1rm: 70, rir: 2, rest_sec: 90 },
                  { reps: 8, load_pct_1rm: 70, rir: 2, rest_sec: 90 }
                ]
              },
              {
                exercise_library_id: "bent_over_row",
                name: "Bent-over Row",
                sets: [
                  { reps: 8, load_pct_1rm: 70, rir: 2, rest_sec: 90 },
                  { reps: 8, load_pct_1rm: 70, rir: 2, rest_sec: 90 },
                  { reps: 8, load_pct_1rm: 70, rir: 2, rest_sec: 90 }
                ]
              },
              {
                exercise_library_id: "shoulder_press",
                name: "Shoulder Press",
                sets: [
                  { reps: 10, load_pct_1rm: 60, rir: 2, rest_sec: 60 },
                  { reps: 10, load_pct_1rm: 60, rir: 2, rest_sec: 60 }
                ]
              },
              {
                exercise_library_id: "lat_pulldown",
                name: "Lat Pulldown",
                sets: [
                  { reps: 12, load_pct_1rm: 55, rir: 2, rest_sec: 60 },
                  { reps: 12, load_pct_1rm: 55, rir: 2, rest_sec: 60 }
                ]
              },
              {
                exercise_library_id: "bicep_curl",
                name: "Bicep Curl",
                sets: [
                  { reps: 15, load_pct_1rm: 50, rir: 1, rest_sec: 45 },
                  { reps: 15, load_pct_1rm: 50, rir: 1, rest_sec: 45 }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  status: "final",
  source_prompt:
    "Generate a single 40-minute upper body strength workout for a beginner using bench, barbell, and dumbbells.",
  seed: 12345,
  version: 1,
  errors: {}
};


export default function WorkoutScreen() {
  const theme = useAppTheme();

  // global state
  // const { getQuickWorkout, loading, error } = useWorkoutContext();

  // local state
  const [ error, setError ] = useState(null)
  // console.log('error state set: ', error)

  // button value state
  const [focusValue, setFocusValue] = useState<string>(
    WORKOUT_OPTS.sessionFocus[0]
  );
  const [typeValue, setTypeValue] = useState<string>(
    WORKOUT_OPTS.sessionType[0]
  );
  const [skillValue, setSkillValue] = useState<string>(
    WORKOUT_OPTS.skillLevels[0]
  );
  const [intensityValue, setIntensityValue] = useState<string>(
    WORKOUT_OPTS.intensityLevels[0]
  );
  const [durationValue, setDurationValue] = useState<string>(
    WORKOUT_OPTS.durationOptions[0]
  );
  const [allValueSelections, setAllValueSelections] = useState<string[]>([]);

  // save ai generated plan prior to submitting to ai_plans table
  const [aiGeneratedPlan, setAiGeneratedPlan] = useState<any>(null)

  // generate workout form submit state
  const [generatedWorkout, setGeneratedWorkout] = useState<any>(null);
  // console.log(generatedWorkout)

  // generates a recommended workout per the user selections
  const generateWorkout = async () => {
    // setLoading(true)

    try { 
      
    const workoutValueSelections: Record<string, string> = {
      focus: focusValue,
      type: typeValue,
      skill: skillValue,
      intensity: intensityValue,
      duration: durationValue,
    };
    
    // Add more meta data here when db setup done
    const userProfileMeta: Record<string, string> = {

    }

    // Call openAI api to generage the ai plan
    const openAiReponse = fakeAiApiResponse
    console.log("openAiReponse: ", openAiReponse)

    // add response data to setGenerateWorkout local state
    
    
    setTimeout(() => {
      setAiGeneratedPlan(openAiReponse)
      setGeneratedWorkout(openAiReponse.plan_json.weeks[0]) // should give a single day workout
    }, 500);
    // setLoading(false)

     } catch (err: any) {
      console.log('acceptWorkout error: ', err.error);
      setError(err)
     }


    // const collapse = {
    //   //   // helper for checking for matched values
    //   //   const selectionsMatch = (dbSelections: any, formSelections: any) => {
    //   //     return Object.keys(formSelections).every(
    //   //       (key) => dbSelections[key] === formSelections[key]
    //   //     );
    //   //   };
    
    //   //   // search for the workout based on matching selected values with pre-set workouts in the mocked json db
    //   //   const matchWorkout = workoutDB.workouts.find((workoutItem) =>
    //   //     selectionsMatch(workoutItem.selections, workoutValueSelections)
    //   //   );
    
    //   //   // fake api call for the interim; generates the workout per the value selections
    //   //   setTimeout(() => {
    //   //     if (matchWorkout) {
    //   //       setGeneratedWorkout(matchWorkout.workout);
    //   //       console.log('Found workout:', matchWorkout.workout.name);
    //   //     } else {
    //   //       console.log('No matching workout found');
    //   //       setGeneratedWorkout(null); // or error
    //   //     }
    //   //   }, 500);
    //   //   // setLoading(false)
    // }
  };

  // accepts the ai generated workout by adding it to AI_Plans table and adds the workout to workouts table, both connect to user id
  const acceptWorkout = async () => {
  try {
    // sets context
    // getQuickWorkout(generatedWorkout);

    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.log('supabase Auth error')
    }

    // gets auth token
    const authToken = data.session?.access_token

    // Save the plan to ai_plans in db with relevant data
  //   const responseAiPlan = await fetch('http://localhost:3000/api/ai/plans', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${authToken}`
  //     },
  //     body: JSON.stringify(aiGeneratedPlan), // or whatever data you want to send
  //   });

  //   const responseAiPlanData = await responseAiPlan.json();
    
  //   if (!responseAiPlan.ok) {
  //     throw {
  //       code: responseAiPlanData.code,            
  //       status: responseAiPlan.status
  //     };
  //   }
    
  //   // --------

  //   // save workout to db by posting to /workouts
  //   const responseWorkout = await fetch('http://localhost:3000/api/workouts', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${authToken}`
  //     },
  //       body: JSON.stringify({
  //         week_start: generatedWorkout.week_start,
  //         sessions: generatedWorkout.sessions,
  //         ai_plan_id: responseAiPlanData.id // Include the plan ID for tracking
  // }) // or whatever data you want to send
  //   });

  //   const responseWorkoutData = await responseWorkout.json();

  //   if (!responseWorkout.ok) {
  //     throw {
  //       code: responseWorkoutData.code,            
  //       status: responseWorkout.status  // recall this is the error number
  //     };
  //   }

  console.log('DATA SENT TO BE: ', aiGeneratedPlan, generatedWorkout)
  const response = await fetch('http://localhost:3000/api/workouts/accept-workout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        aiGeneratedPlan,
        generatedWorkout
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw {
        code: responseData.code,            
        status: response.status  // recall this is the error number
      };
    }

    console.log("Workout accepted:", data);
    
    router.push('/(tabs)/workout');
  } catch (err: any) {
    console.log('acceptWorkout error: ', err.error);
    setError(err)
  }
};

  // adds all values to an array. Used in the chips components after workout is generated
  useEffect(() => {
    setAllValueSelections([
      focusValue,
      typeValue,
      skillValue,
      intensityValue,
      durationValue,
    ]);
  }, [focusValue, typeValue, skillValue, intensityValue, durationValue]);

  // console.log(generatedWorkout);
  // console.log(allValueSelections);

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
          paddingLeft: theme.spacing.md,
          paddingRight: theme.spacing.md,
        },
      ]}
    >
      <SafeAreaView style={{ gap: theme.spacing.md }}>
        <Card
          style={[
            {
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          <Card.Content>
            <ThemedText
              variant="titleMedium"
              style={{ color: theme.colors.onSurface, marginBottom: 16 }}
            >
              Generate a quick workout
            </ThemedText>

            <View style={styles.cardItems}>
              <View>
                <SectionLabel>Focus</SectionLabel>
                <CustomSegmentedButton
                  buttonValues={WORKOUT_OPTS.sessionFocus}
                  selectValue={setFocusValue}
                />
              </View>

              <View>
                <SectionLabel>Type</SectionLabel>
                <CustomSegmentedButton
                  buttonValues={WORKOUT_OPTS.sessionType}
                  selectValue={setTypeValue}
                />
              </View>

              <View>
                <SectionLabel>Skill</SectionLabel>
                <CustomSegmentedButton
                  buttonValues={WORKOUT_OPTS.skillLevels}
                  selectValue={setSkillValue}
                />
              </View>

              <View>
                <SectionLabel>Intensity</SectionLabel>
                <CustomSegmentedButton
                  buttonValues={WORKOUT_OPTS.intensityLevels}
                  selectValue={setIntensityValue}
                />
              </View>

              <View>
                <SectionLabel>Duration</SectionLabel>
                <CustomSegmentedButton
                  buttonValues={WORKOUT_OPTS.durationOptions}
                  selectValue={setDurationValue}
                />
              </View>

              <ThemedButton
                mode="contained"
                variant="contained"
                icon={'dumbbell'}
                onPress={generateWorkout}
              >
                Generate workout
              </ThemedButton>
            </View>
          </Card.Content>
        </Card>

        {generatedWorkout ? (
          <Card
            style={[
              {
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <Card.Content>
              <ThemedText
                variant="titleMedium"
                style={{ color: theme.colors.onSurface, marginBottom: 16 }}
              >
                Suggested workout
              </ThemedText>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: theme.spacing.sm,
                  marginBottom: theme.spacing.md,
                }}
              >
                {allValueSelections.map((v, index) => (
                  <Chip key={index} textStyle={theme.typography.labelMedium}>
                    {v}
                  </Chip>
                ))}
              </View>
             <View>
                {aiGeneratedPlan.plan_json.weeks[0].sessions[0].blocks.map(
                  (block: any, index: number) => (
                    <View
                      key={index}
                      style={{
                        borderRadius: theme.borderRadius.sm,
                        backgroundColor: theme.colors.secondaryContainer,
                        paddingVertical: theme.spacing.sm,
                        paddingHorizontal: theme.spacing.md,
                        marginBottom: theme.spacing.sm,
                        marginTop: theme.spacing.md,
                      }}
                    >
                      <ThemedText
                        variant="bodyLarge"
                        style={{ fontWeight: 'bold' }}
                      >
                        {block.name}
                      </ThemedText>
                      <ThemedText>
                        {block.sets.length} x {block.sets[0].reps} reps
                      </ThemedText>
                      <ThemedText>{block.sets[0].rest_sec}s rest</ThemedText>
                    </View>
                  )
                )}
              </View>
              <ThemedButton
                mode="contained"
                variant="contained"
                onPress={acceptWorkout}
              >
                Accept workout!
              </ThemedButton>
              <ThemedButton
                mode="outlined"
                variant="outlined"
                onPress={() => router.push('/modal')}
              >
                Regenerate
              </ThemedButton>
            </Card.Content>
          </Card>
        ) : (
          <ThemedText>
            Sorry, please try a different combination. More combinations coming
            soon!
          </ThemedText>
        )}

        { error && <ErrorDialog error={error} /> }
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardItems: { gap: 16, paddingBottom: 2 },
});
