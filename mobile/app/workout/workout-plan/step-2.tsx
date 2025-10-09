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
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StepTwo() {
  const theme = useAppTheme();
  const styles = useStyles(theme);

  // global state
  const { state, updateStepTwo } = useMultiStepWorkoutContext();

  // local state
  const [focusValue, setFocusValue] = useState<string>(
    state.stepTwoData.sessionFocus || WORKOUT_OPTS.sessionFocus[0]
  );
  const [typeValue, setTypeValue] = useState<string>(
    state.stepTwoData.sessionType || WORKOUT_OPTS.sessionType[0]
  );
  const [skillValue, setSkillValue] = useState<string>(
    state.stepTwoData.skillLevel || WORKOUT_OPTS.skillLevels[0]
  );
  const [intensityValue, setIntensityValue] = useState<string>(
    state.stepTwoData.intensityLevels || WORKOUT_OPTS.intensityLevels[0]
  );
  const [durationValue, setDurationValue] = useState<string>(
    state.stepTwoData.durationOptions || WORKOUT_OPTS.durationOptions[0]
  );
  const [enduranceValue, setEnduranceValue] = useState<string>(
    state.stepTwoData.enduranceSport || WORKOUT_OPTS.enduranceSport[3]
  );

  const handleBack = () => {
    router.back();
  };

  const handleGeneratePlan = () => {
    console.log('Session details:', {
      focus: focusValue,
      type: typeValue,
      skill: skillValue,
      intensity: intensityValue,
      duration: durationValue,
      endurance: enduranceValue,
    });
    updateStepTwo({
      sessionFocus: focusValue,
      sessionType: typeValue,
      skillLevel: skillValue,
      intensityLevels: intensityValue,
      durationOptions: durationValue,
      enduranceSport: enduranceValue,
    });
    router.push('/workout/workout-plan/step-3');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <CustomStepper currentStep={2} totalSteps={3} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedText variant="headlineMedium" style={styles.title}>
            Tell us about your sessions
          </ThemedText>

          <View style={styles.section}>
            <SectionLabel>Focus</SectionLabel>
            <CustomSegmentedButton
              buttonValues={WORKOUT_OPTS.sessionFocus}
              selectValue={setFocusValue}
            />
          </View>

          <View style={styles.section}>
            <SectionLabel>Type</SectionLabel>
            <CustomSegmentedButton
              buttonValues={WORKOUT_OPTS.sessionType}
              selectValue={setTypeValue}
            />
          </View>

          <View style={styles.section}>
            <SectionLabel>Skill</SectionLabel>
            <CustomSegmentedButton
              buttonValues={WORKOUT_OPTS.skillLevels}
              selectValue={setSkillValue}
            />
          </View>

          <View style={styles.section}>
            <SectionLabel>Intensity</SectionLabel>
            <CustomSegmentedButton
              buttonValues={WORKOUT_OPTS.intensityLevels}
              selectValue={setIntensityValue}
            />
          </View>

          <View style={styles.section}>
            <SectionLabel>Duration</SectionLabel>
            <CustomSegmentedButton
              buttonValues={WORKOUT_OPTS.durationOptions}
              selectValue={setDurationValue}
            />
          </View>

          <View style={styles.section}>
            <SectionLabel>Endurance Sport</SectionLabel>
            <CustomSegmentedButton
              buttonValues={WORKOUT_OPTS.enduranceSport}
              selectValue={setEnduranceValue}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.buttonRow}>
            <ThemedButton
              mode="outlined"
              variant="outlined"
              onPress={handleBack}
              style={styles.backButton}
            >
              Back
            </ThemedButton>
            <ThemedButton
              mode="contained"
              variant="contained"
              onPress={handleGeneratePlan}
              style={styles.generateButton}
            >
              Generate Plan
            </ThemedButton>
          </View>
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
        },
        section: {
          marginBottom: theme.spacing.lg,
        },
        enduranceButtons: {
          flexDirection: 'row',
          gap: theme.spacing.sm,
          marginTop: theme.spacing.sm,
          flexWrap: 'wrap',
        },
        enduranceButton: {
          flex: 1,
          minWidth: 100,
        },
        footer: {
          paddingHorizontal: theme.spacing.md,
          paddingBottom: theme.spacing.md,
          paddingTop: theme.spacing.md,
        },
        buttonRow: {
          flexDirection: 'row',
          gap: theme.spacing.sm,
        },
        backButton: {
          flex: 0,
          minWidth: 80,
        },
        generateButton: {
          flex: 1,
        },
      }),
    [theme]
  );
