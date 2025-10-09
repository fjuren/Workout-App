import CustomStepper from '@/components/CustomStepper';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { AppTheme } from '@/constants/theme';
import { useMultiStepWorkoutContext } from '@/context/MultiStepWorkoutContext';
import { useAppTheme } from '@/hooks/use-app-theme';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// mocking workout data until db ready
const weekSchedule = [
  {
    date: 'Monday, Oct 6',
    focus: 'Upper Body • Strength',
    exercises: [
      { name: 'Bench Press', sets: 3, reps: '8-10' },
      { name: 'Overhead Press', sets: 2, reps: '8-10' },
      { name: 'Bent Over Rows', sets: 3, reps: '8-10' },
    ],
    description:
      'This low intensity upper body session is designed for beginner lifters. Focus on form and control throughout each exercise. Rest 60-90 seconds between sets.',
  },
  {
    date: 'Wednesday, Oct 8',
    focus: 'Upper Body • Strength',
    exercises: [
      { name: 'Bench Press', sets: 3, reps: '8-10' },
      { name: 'Overhead Press', sets: 2, reps: '8-10' },
      { name: 'Bent Over Rows', sets: 3, reps: '8-10' },
    ],
    description:
      'This low intensity upper body session is designed for beginner lifters. Focus on form and control throughout each exercise. Rest 60-90 seconds between sets.',
  },
  {
    date: 'Friday, Oct 10',
    focus: 'Lower Body • Strength',
    exercises: [
      { name: 'Squats', sets: 3, reps: '8-10' },
      { name: 'Deadlifts', sets: 2, reps: '8-10' },
      { name: 'Leg Press', sets: 3, reps: '8-10' },
    ],
    description:
      'Lower body focused session targeting major leg muscle groups. Maintain proper form and breathing throughout.',
  },
];

export default function Step3() {
  const theme = useAppTheme();
  const styles = useStyles(theme);

  // global state
  const { updateStepThree } = useMultiStepWorkoutContext();

  const handleAdjust = (date: string) => {
    // coming soon modal, not implemented yet
    router.push('/modal');
  };

  const handleComplete = () => {
    console.log('workout plan flow done - need to implement db');
    updateStepThree({
      weeklySchedule: weekSchedule,
    });
    router.push('/(tabs)/workout');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <CustomStepper currentStep={3} totalSteps={3} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedText variant="headlineMedium" style={styles.title}>
            Your Week Ahead
          </ThemedText>

          {weekSchedule.map((day, index) => (
            <Card key={index} style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <View>
                    <ThemedText variant="titleLarge" style={styles.dateText}>
                      {day.date}
                    </ThemedText>
                    <ThemedText style={styles.focusText}>
                      {day.focus}
                    </ThemedText>
                  </View>
                  <ThemedButton
                    mode="outlined"
                    variant="outlined"
                    onPress={() => handleAdjust(day.date)}
                    compact
                    style={styles.adjustButton}
                  >
                    Adjust
                  </ThemedButton>
                </View>

                <View style={styles.exercisesContainer}>
                  {day.exercises.map((exercise, exIndex) => (
                    <View key={exIndex} style={styles.exerciseItem}>
                      <ThemedText
                        variant="bodyLarge"
                        style={styles.exerciseName}
                      >
                        {exercise.name}
                      </ThemedText>
                      <ThemedText style={styles.exerciseDetails}>
                        {exercise.sets} sets × {exercise.reps} reps
                      </ThemedText>
                    </View>
                  ))}
                </View>

                <ThemedText style={styles.descriptionText}>
                  {day.description}
                </ThemedText>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <ThemedButton
            mode="contained"
            variant="contained"
            onPress={handleComplete}
            style={styles.completeButton}
          >
            Start My Plan
          </ThemedButton>
        </View>
      </SafeAreaView>
    </View>
  );
}

const useStyles = (theme: AppTheme) =>
  useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: theme.colors.background,
        },
        safeArea: {
          flex: 1,
        },
        scrollView: {
          flex: 1,
        },
        scrollContent: {
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.xl,
        },
        title: {
          marginTop: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
          fontWeight: 'bold',
          color: theme.colors.onBackground,
        },
        card: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.md,
          marginBottom: theme.spacing.md,
        },
        cardHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: theme.spacing.md,
        },
        dateText: {
          color: theme.colors.onSurface,
          fontWeight: 'bold',
          marginBottom: theme.spacing.xs,
        },
        focusText: {
          color: theme.colors.primary,
          fontSize: 14,
        },
        adjustButton: {
          minWidth: 80,
        },
        exercisesContainer: {
          gap: theme.spacing.md,
          marginBottom: theme.spacing.md,
        },
        exerciseItem: {
          borderLeftWidth: 3,
          borderLeftColor: theme.colors.surfaceVariant,
          paddingLeft: theme.spacing.sm,
        },
        exerciseName: {
          color: theme.colors.onSurface,
          fontWeight: '600',
          marginBottom: theme.spacing.xs,
        },
        exerciseDetails: {
          color: theme.colors.onSurfaceVariant,
          fontSize: 14,
        },
        descriptionText: {
          color: theme.colors.onSurfaceVariant,
          fontSize: 14,
          lineHeight: 20,
          fontStyle: 'italic',
        },
        footer: {
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.md,
          paddingTop: theme.spacing.md,
        },
        completeButton: {
          width: '100%',
        },
      }),
    [theme]
  );
