import ErrorDialog from '@/components/ErrorDialog';
import MyWorkoutListAccordionGrp from '@/components/ListAccordion';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { supabase } from '@/config/supabase';
import { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { WorkoutExercise } from '@/types/workouts';
import { UserErrorMessages } from '@/utils/errorMessages';
import { mockWorkoutExercises, useMockData } from '@/utils/mockData';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DoQuickWorkout() {
  const theme = useAppTheme();
  const styles = useStyles(theme);
  const isMockMode = useMockData();
  // local state
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    []
  );
  const [error, setError] = useState(null);
  // global state

  // query params
  const { workoutId, workoutTitle, workoutType } = useLocalSearchParams<{
    workoutId: string;
    workoutTitle: string;
    workoutType: string;
  }>();

  // get workout exercises
  const getWorkoutExerciseData = async () => {
    try {
      // get auth token
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        console.log('SessionError: ,', sessionError);
        throw {
          code: UserErrorMessages.TOKEN_EXPIRED,
          status: 401,
        };
      }

      const authToken = data.session?.access_token;

      const response = await fetch(
        `http://localhost:3000/api/workouts/quick-workout-exercise?workoutId=${workoutId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw {
          code: responseData.code,
          status: response.status, // recall this is the error number
        };
      }

      setWorkoutExercises(responseData.workout_exercise);
    } catch (error: any) {
      setError(error);
    }
  };

  const completeWorkout = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log('supabase Auth error');
      }

      // gets auth token
      const authToken = data.session?.access_token;

      const response = await fetch(
        'http://localhost:3000/api/workouts/complete-workout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            workoutId,
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
    } catch (err) {
      console.log('Completed workout error: ', err);
      setError(error);
    }
  };

  useEffect(() => {
    if (isMockMode) {
      let workoutIdExercises: any = [];
      mockWorkoutExercises.forEach((exercise) => {
        if (exercise['workout_id'] === workoutId) {
          workoutIdExercises.push(exercise);
        }
      });
      setWorkoutExercises(workoutIdExercises);
    } else {
      getWorkoutExerciseData();
    }
  }, []);

  return (
    <ScrollView style={[styles.container]}>
      <SafeAreaView>
        <ThemedText
          variant="headlineSmall"
          style={[
            styles.title,
            {
              color: theme.colors.onBackground,
              marginBottom: theme.spacing.lg,
            },
          ]}
        >
          {`${workoutTitle} Workout`}
        </ThemedText>
        <MyWorkoutListAccordionGrp workoutExercises={workoutExercises} />
        <View>
          <ThemedButton variant="contained" onPress={completeWorkout}>
            Complete workout!
          </ThemedButton>
          {error && <ErrorDialog error={error} />}
        </View>
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
          padding: theme.spacing.md,
        },
        card: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.md,
        },
        title: {
          // fontWeight: 'bold',
        },
      }),
    [theme]
  );
