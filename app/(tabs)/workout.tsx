import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import type { AppTheme } from '@/constants/theme';
import { useWorkoutContext } from '@/context/WorkoutContext';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
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
              style={[styles.card, { alignItems: 'center' }]}
              onPress={() => router.push('/workout/do-quick-workout')}
            >
              <Card.Content>
                <ThemedText
                  variant="titleMedium"
                  style={[
                    styles.themedText,
                    {
                      // justifyContent: 'center',
                      // alignSelf: 'center',
                      marginBottom: 'auto',
                      fontWeight: 'bold',
                    },
                  ]}
                >
                  {quickWorkout.name}
                </ThemedText>
                <ThemedText
                  variant="bodyMedium"
                  style={{ alignSelf: 'center' }}
                >
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
