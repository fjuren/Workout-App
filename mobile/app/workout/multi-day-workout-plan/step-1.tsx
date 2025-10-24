import CustomSegmentedButton from '@/components/CustomSegmentedButtons';
import CustomStepper from '@/components/CustomStepper';
import SectionLabel from '@/components/SectionLabel';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { WORKOUT_OPTS } from '@/constants/constants';
import { AppTheme } from '@/constants/theme';
import { useMultiStepWorkoutContext } from '@/context/MultiStepWorkoutContext';
import { useAppTheme } from '@/hooks/use-app-theme';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
// import TextInput from '@/components/TextInput';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StepOne() {
  const theme = useAppTheme();
  const styles = useStyles(theme);

  // global state
  const { state, updateStepOne } = useMultiStepWorkoutContext();

  // local state
  const [startDate, setStartDate] = useState<Date>(
    state.stepOneData.planStartDate || new Date()
  );
  const [duration, setDuration] = useState<string>(
    state.stepOneData.durationWeekOptions || '2 weeks'
  );
  const [selectedDays, setSelectedDays] = useState<string[]>(
    state.stepOneData.trainingDays || ['Mon', 'Wed', 'Fri']
  );
  const [notes, setNotes] = useState<string>(
    state.stepOneData.specialNotes || ''
  );

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleNext = () => {
    console.log('Plan details:', { startDate, duration, selectedDays, notes });
    updateStepOne({
      planStartDate: startDate,
      durationWeekOptions: duration,
      trainingDays: selectedDays,
      specialNotes: notes,
    });
    router.push('/workout/multi-day-workout-plan/step-1');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <CustomStepper currentStep={1} totalSteps={3} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedText variant="headlineMedium" style={styles.title}>
            Build your plan
          </ThemedText>

          <View style={styles.section}>
            <SectionLabel>Plan Start Date</SectionLabel>
            <View style={styles.dateInput}>
              <ThemedText style={styles.dateText}>
                {startDate.toLocaleDateString('en-US', {
                  month: '2-digit',
                  day: '2-digit',
                  year: 'numeric',
                })}
              </ThemedText>
            </View>
          </View>

          <View style={styles.section}>
            <SectionLabel>Plan Duration</SectionLabel>
            <CustomSegmentedButton
              buttonValues={WORKOUT_OPTS.durationWeekOptions}
              selectValue={setDuration}
            />
          </View>

          <View style={styles.section}>
            <SectionLabel>Which days can you train?</SectionLabel>
            <View style={styles.daysContainer}>
              {daysOfWeek.map((day) => (
                <ThemedButton
                  key={day}
                  mode={selectedDays.includes(day) ? 'contained' : 'outlined'}
                  variant={
                    selectedDays.includes(day) ? 'contained' : 'outlined'
                  }
                  onPress={() => toggleDay(day)}
                  style={styles.dayButton}
                  compact
                >
                  {day}
                </ThemedButton>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionLabel>Special requests or notes (optional)</SectionLabel>
            <TextInput
              style={styles.notesInput}
              placeholder="e.g., knee injury, prefer dumbbells..."
              placeholderTextColor={theme.colors.onSurfaceVariant}
              multiline
              numberOfLines={4}
              maxLength={120}
              value={notes}
              onChangeText={setNotes}
            />
            <ThemedText style={styles.characterCount}>
              {notes.length}/120
            </ThemedText>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <ThemedButton
            mode="contained"
            variant="contained"
            // onPress={handleNext}
            onPress={() => router.push('../../modal')}
            style={styles.nextButton}
          >
            Next
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
        },
        title: {
          marginTop: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
          fontWeight: 'bold',
        },
        section: {
          marginBottom: theme.spacing.lg,
        },
        dateInput: {
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: theme.borderRadius.md,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.md,
          marginTop: theme.spacing.sm,
        },
        dateText: {
          fontSize: 16,
        },
        durationButtons: {
          flexDirection: 'row',
          gap: theme.spacing.sm,
          marginTop: theme.spacing.sm,
          flexWrap: 'wrap',
        },
        durationButton: {
          flex: 1,
          minWidth: 80,
        },
        daysContainer: {
          flexDirection: 'row',
          gap: theme.spacing.sm,
          marginTop: theme.spacing.sm,
          flexWrap: 'wrap',
        },
        dayButton: {
          minWidth: 60,
        },
        notesInput: {
          marginTop: theme.spacing.sm,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.surfaceVariant,
          color: theme.colors.onSurface,
          borderRadius: theme.borderRadius.md,
          textAlignVertical: 'top',
          fontSize: 14,
        },
        characterCount: {
          fontSize: 12,
          color: theme.colors.onSurfaceVariant,
          textAlign: 'right',
          marginTop: theme.spacing.xs,
        },
        footer: {
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.md,
          paddingTop: theme.spacing.md,
        },
        nextButton: {
          width: '100%',
        },
      }),
    [theme]
  );
