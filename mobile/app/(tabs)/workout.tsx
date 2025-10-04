import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import type { AppTheme } from '@/constants/theme';
import { useWorkoutContext } from '@/context/WorkoutContext';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutScreen() {
  const theme = useAppTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  // global state
  const { quickWorkout } = useWorkoutContext();
  console.log('workoutpage quickworkout: ', quickWorkout);

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
            onPress={() => router.push('/modal')}
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
        {quickWorkout ? (
          <View>
            <ThemedText style={styles.themedText} variant="titleMedium">
              Quick workout
            </ThemedText>
            <Card
              style={styles.card}
              onPress={() => router.push('/workout/do-quick-workout')}
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
                    {quickWorkout.name}
                  </ThemedText>
                  {quickWorkout.complete ? (
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
                  {quickWorkout.totalTime}
                </ThemedText>
              </Card.Content>
            </Card>
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
