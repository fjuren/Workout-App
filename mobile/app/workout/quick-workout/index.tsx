import CustomSegmentedButton from '@/components/CustomSegmentedButtons';
import ErrorDialog from '@/components/ErrorDialog';
import SectionLabel from '@/components/SectionLabel';
import TextInput from '@/components/TextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { supabase } from '@/config/supabase';
// TODO update to shared version of WORKOUT_OPTS
import { WORKOUT_OPTS } from '@/constants/constants';
import { AppTheme } from '@/constants/theme';
import { useAuthContext } from '@/context/AuthContext';
import { useAppTheme } from '@/hooks/use-app-theme';
import { ProfileSettings } from '@/types/user';
import { mockAiApiResponse, useMockData } from '@/utils/mockData';
import { ErrorCode } from '@shared/types/errors';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutScreen() {
  const { profileSettings } = useAuthContext();
  console.log('PROFILE SETTINGS: ', profileSettings);
  const theme = useAppTheme();
  const styles = useStyles(theme);
  const isMockMode = useMockData();
  // global state
  // const { getQuickWorkout, loading, error } = useWorkoutContext();

  // local state
  const [error, setError] = useState(null);
  // console.log('error state set: ', error)

  // button value local states
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
  const [notesValue, setNotesValue] = useState<{
    value: string;
    error: string;
  }>({
    value: '',
    error: '',
  });

  const [allValueSelections, setAllValueSelections] = useState<string[]>([]);

  // save ai generated plan prior to submitting to ai_plans table
  const [aiGeneratedPlan, setAiGeneratedPlan] = useState<any>(null);

  // generate workout form submit state
  const [generatedWorkout, setGeneratedWorkout] = useState<any>(null);
  // console.log(aiGeneratedPlan);
  // console.log(generatedWorkout);

  // calls my single/quick workout session endpoint that fetches openAI's 'responses' api
  const getAIWorkoutData = async (
    workoutValueSelections: Record<string, string>,
    userProfileMetaData: ProfileSettings
  ) => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log('supabase Auth error');
      }

      // gets auth token
      const authToken = data.session?.access_token;

      const response = await fetch(
        'http://localhost:3000/api/ai-plans/generate-workout/single',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            workoutValueSelections,
            userProfileMetaData,
          }),
        }
      );

      const responseData = await response.json();
      // console.log('AI_responseData', responseData);

      if (!response.ok) {
        // TODO improve error response when server is down (i.e., kill server and see current message)
        throw {
          code: responseData.code,
          status: response.status, // recall this is the error number
        };
      }

      // data from openAI response
      setAiGeneratedPlan(responseData.aiWorkoutPlan);
      setGeneratedWorkout(responseData.aiWorkoutPlan.plan_json.weeks[0]);
    } catch (error: any) {
      setError(error);
    }
  };

  // generates a recommended workout per the user selections
  const generateWorkout = async () => {
    // setLoading(true)

    // TODO add to validation in utils/validation
    if (notesValue.value.length > 120) {
      setNotesValue({
        ...notesValue,
        error: 'Notes must be 120 characters or less',
      });
      return;
    }

    try {
      const workoutValueSelections: Record<string, string> = {
        focus: focusValue,
        type: typeValue,
        skill: skillValue,
        intensity: intensityValue,
        duration: durationValue,
        notes: notesValue.value,
      };
      // console.log('workoutValueSelections', workoutValueSelections);

      if (!profileSettings) {
        throw {
          code: ErrorCode.NOT_FOUND,
          status: 404,
        };
      }

      // Add more meta data here when db setup done
      const userProfileMetaData = profileSettings;
      // console.log('userProfileMeta', userProfileMetaData);

      // Call openAI api to generage the ai plan
      const mockAiReponse = mockAiApiResponse;
      // console.log('openAiReponse: ', openAiReponse);

      // add response data to setGenerateWorkout local state

      if (isMockMode) {
        setAiGeneratedPlan(mockAiReponse);
        setGeneratedWorkout(mockAiReponse.plan_json.weeks[0]); // should give a single day workout
      } else {
        // fetch real api data (IMPORTANT NOTE: each fetch costs money; use 'isMockMode' when testing; rate limiters added)
        getAIWorkoutData(workoutValueSelections, userProfileMetaData);
      }

      // setLoading(false)
    } catch (err: any) {
      console.log('generateWorkout error: ', err.error);
      setError(err);
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

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log('supabase Auth error');
      }

      // gets auth token
      const authToken = data.session?.access_token;

      // console.log('DATA SENT TO BE: ', aiGeneratedPlan, generatedWorkout);
      const response = await fetch(
        'http://localhost:3000/api/workouts/accept-workout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            aiGeneratedPlan,
            generatedWorkout,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        // TODO improve error response when server is down (i.e., kill server and see current message)
        throw {
          code: responseData.code,
          status: response.status, // recall this is the error number
        };
      }

      router.push('/(tabs)/workout');
    } catch (err: any) {
      console.log('acceptWorkout error: ', err.error);
      setError(err);
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

              <View>
                <SectionLabel>
                  Special requests or notes (optional)
                </SectionLabel>
                <TextInput
                  returnKeyType="next"
                  value={notesValue.value}
                  onChangeText={(text) =>
                    setNotesValue({ value: text, error: '' })
                  }
                  error={!!notesValue.error}
                  errorText={notesValue.error}
                  placeholder="e.g., knee injury, prefer dumbbells..."
                  placeholderTextColor={theme.colors.onSurfaceVariant}
                  multiline
                  numberOfLines={4}
                  // note: form submit includes extra validation as a safety net in case max value is manipulated
                  // TODO should add this safety net to the CustomSegmentedButtons
                  maxLength={120}
                />
                <ThemedText style={styles.characterCount}>
                  {notesValue.value.length}/120
                </ThemedText>
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
          <View></View>
        )}

        {error && <ErrorDialog error={error} />}
      </SafeAreaView>
    </ScrollView>
  );
}

const useStyles = (theme: AppTheme) =>
  useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        characterCount: {
          fontSize: 12,
          color: theme.colors.onSurfaceVariant,
          textAlign: 'right',
          marginTop: theme.spacing.xs,
        },
        cardItems: { gap: 16, paddingBottom: 2 },
      }),
    [theme]
  );
