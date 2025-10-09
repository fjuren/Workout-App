import CustomSegmentedButton from '@/components/CustomSegmentedButtons';
import SectionLabel from '@/components/SectionLabel';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { WORKOUT_OPTS } from '@/constants/constants';
import { useWorkoutContext } from '@/context/DoQuickWorkoutContext';
import { useAppTheme } from '@/hooks/use-app-theme';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import workoutDB from '../../../assets/data/workoutDB.json';

export default function WorkoutScreen() {
  const theme = useAppTheme();

  // global state
  const { getQuickWorkout, loading, error } = useWorkoutContext();

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

  // generate workout form submit state
  const [generatedWorkout, setGeneratedWorkout] = useState<any>(null);

  // generates a recommended workout per the user selections
  const generateWorkout = () => {
    // setLoading(true)

    const workoutValueSelections: Record<string, String> = {
      focus: focusValue,
      type: typeValue,
      skill: skillValue,
      intensity: intensityValue,
      duration: durationValue,
    };

    // helper for checking for matched values
    const selectionsMatch = (dbSelections: any, formSelections: any) => {
      return Object.keys(formSelections).every(
        (key) => dbSelections[key] === formSelections[key]
      );
    };

    // search for the workout based on matching selected values with pre-set workouts in the mocked json db
    const matchWorkout = workoutDB.workouts.find((workoutItem) =>
      selectionsMatch(workoutItem.selections, workoutValueSelections)
    );

    // fake api call for the interim; generates the workout per the value selections
    setTimeout(() => {
      if (matchWorkout) {
        setGeneratedWorkout(matchWorkout.workout);
        console.log('Found workout:', matchWorkout.workout.name);
      } else {
        console.log('No matching workout found');
        setGeneratedWorkout(null); // or error
      }
    }, 500);
    // setLoading(false)
  };

  // accepts the generated workout, and adds the workout to their day
  const acceptWorkout = () => {
    try {
      getQuickWorkout(generatedWorkout);
      router.push('/(tabs)/workout');
    } catch (err) {
      console.log('acceptWorkout error: ', err);
      throw new Error();
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
                {generatedWorkout['exercises'].map(
                  (exercise: any, index: number) => (
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
                        {exercise.name}
                      </ThemedText>
                      <ThemedText>
                        {exercise.sets} x {exercise.reps} reps
                      </ThemedText>
                      <ThemedText>{exercise.restTime} rest</ThemedText>
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
