import ErrorDialog from '@/components/ErrorDialog';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { supabase } from '@/config/supabase';
import type { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { Workout } from '@/types/workouts';
import { UserErrorMessages } from '@/utils/errorMessages';
import { mockQuickWorkouts, useMockData } from '@/utils/mockData';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Use it like this:
// setQuickWorkouts(mockQuickWorkouts);

export default function WorkoutScreen() {
  const theme = useAppTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  const isMockMode = useMockData();

  // local state
  const [error, setError] = useState(null);
  const [quickWorkouts, setQuickWorkouts] = useState<Workout[]>([]);
  // global state
  // const { quickWorkout } = useWorkoutContext();
  // console.log('workoutpage quickworkout: ', quickWorkouts);

  // get quick workout //TODO cache workout data
  const getWorkoutData = async () => {
    // gets auth token
    try {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        throw {
          code: UserErrorMessages.TOKEN_EXPIRED,
          status: 401,
        };
      }

      const authToken = data.session?.access_token;

      const response = await fetch(
        'http://localhost:3000/api/workouts/quick-workouts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        throw {
          code: responseData.code,
          status: response.status, // recall this is the error number
        };
      }
      // console.log('quickworks_DB: ', responseData);
      setQuickWorkouts(responseData.all_quick_workouts);
    } catch (error: any) {
      setError(error);
    }
  };

  useEffect(() => {
    if (isMockMode) {
      setQuickWorkouts(mockQuickWorkouts);
    } else {
      getWorkoutData();
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText
        variant="headlineSmall"
        style={[
          styles.title,
          { color: theme.colors.onBackground, marginBottom: theme.spacing.lg },
        ]}
      >
        Workout
      </ThemedText>

      <Card style={styles.card}>
        <Card.Content>
          <ThemedText variant="titleLarge" style={styles.themedText}>
            Generate Workouts
          </ThemedText>

          <ThemedButton
            mode="contained"
            variant="contained"
            labelStyle={{
              color: theme.colors.onPrimary,
            }}
            onPress={() => router.push('/workout/quick-workout')}
          >
            Generate Single Workout
          </ThemedButton>

          <ThemedText variant="bodyMedium" style={styles.themedText}>
            Create one workout session
          </ThemedText>

          <ThemedButton
            mode="outlined"
            variant="outlined"
            onPress={() =>
              router.push('/workout/multi-day-workout-plan/step-1')
            }
            icon="plus"
          >
            Generate Workout Plan
          </ThemedButton>

          <ThemedText
            variant="bodyMedium"
            style={{ color: theme.colors.onSurfaceVariant }}
          >
            Create a multi-week training plan
          </ThemedText>
        </Card.Content>
      </Card>
      <View>
        <ThemedText
          variant="titleLarge"
          style={{ paddingBottom: theme.spacing.sm }}
        >
          My workouts
        </ThemedText>
        {/* checks if workouts exists */}
        {quickWorkouts.length > 0 ? (
          <View>
            <ThemedText style={styles.themedText} variant="titleMedium">
              Quick workouts
            </ThemedText>
            {quickWorkouts.map((workout: Workout, index: any) => (
              <Card
                key={index}
                style={styles.card}
                onPress={() =>
                  router.push({
                    pathname: '/workout/quick-workout-do',
                    params: {
                      workoutId: workout.id,
                      workoutTitle: workout.title,
                      workoutType: workout.type,
                    },
                  })
                }
              >
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: theme.spacing.sm,
                    }}
                  >
                    <ThemedText
                      variant="titleMedium"
                      style={[
                        styles.themedText,
                        {
                          fontWeight: 'bold',
                          flex: 1,
                        },
                      ]}
                    >
                      {workout.title}
                    </ThemedText>
                    {workout.status === 'completed' ? (
                      <Chip
                        mode="outlined"
                        textStyle={[
                          theme.typography.labelMedium,
                          { color: theme.colors.good },
                        ]}
                        style={{ borderColor: theme.colors.good }}
                      >
                        Complete
                      </Chip>
                    ) : (
                      <Chip
                        mode="outlined"
                        textStyle={[
                          theme.typography.labelMedium,
                          { color: theme.colors.bad },
                        ]}
                        style={{ borderColor: theme.colors.bad }}
                      >
                        To do
                      </Chip>
                    )}
                  </View>
                  <ThemedText variant="bodyMedium">
                    {workout.metadata?.total_time}
                  </ThemedText>
                  {/* <ThemedText variant="bodySmall">
                    {workout.metadata?.focus}
                  </ThemedText> */}
                  {/* <ThemedText variant="bodySmall">
                    Type: {workout.type}
                  </ThemedText> */}
                </Card.Content>
              </Card>
            ))}
          </View>
        ) : (
          <Card style={styles.card}>
            <Card.Content>
              <ThemedText variant="bodyMedium">
                You have no workous. Create a single workout or a workout plan
              </ThemedText>
            </Card.Content>
          </Card>
        )}
      </View>
      {error && <ErrorDialog error={error} />}
    </SafeAreaView>
  );
}

const useStyles = (theme: AppTheme) =>
  useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.background,
          gap: theme.spacing.md,
        },
        card: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.md,
        },
        themedText: {
          color: theme.colors.onSurface,
          marginBottom: theme.spacing.md,
        },
        title: {
          fontWeight: 'bold',
        },
      }),
    [theme]
  );
