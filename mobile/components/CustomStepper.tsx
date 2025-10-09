import { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

const CustomStepper = ({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) => {
  const theme = useAppTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.stepperContainer}>
      <View style={styles.stepperBars}>
        {Array.from({ length: totalSteps }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.stepBar,
              {
                backgroundColor:
                  index < currentStep
                    ? theme.colors.primary
                    : theme.colors.surfaceVariant,
              },
            ]}
          />
        ))}
      </View>
      <ThemedText
        style={[styles.stepText, { color: theme.colors.onSurfaceVariant }]}
      >
        Step {currentStep} of {totalSteps}
      </ThemedText>
    </View>
  );
};

const useStyles = (theme: AppTheme) =>
  useMemo(
    () =>
      StyleSheet.create({
        stepperContainer: {
          paddingHorizontal: theme.spacing.md,
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.sm,
        },
        stepperBars: {
          flexDirection: 'row',
          gap: theme.spacing.sm,
          marginBottom: theme.spacing.sm,
        },
        stepBar: {
          flex: 1,
          height: 4,
          borderRadius: theme.borderRadius.xs,
        },
        stepText: {
          fontSize: 14,
          textAlign: 'right',
        },
      }),
    [theme]
  );

export default CustomStepper;
