import MyWorkoutListAccordionGrp from '@/components/ListAccordion';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { AppTheme } from '@/constants/theme';
import { useWorkoutContext } from '@/context/DoQuickWorkoutContext';
import { useAppTheme } from '@/hooks/use-app-theme';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DoQuickWorkout() {
  const theme = useAppTheme();
  const styles = useStyles(theme);
  // local state
  // n/a

  // global state
  const { quickWorkout, completeQuickWorkout, loading, error } =
    useWorkoutContext();
  console.log('do quickworkout page: ', quickWorkout);

  const completeWorkout = () => {
    try {
      completeQuickWorkout();
      router.push('/(tabs)/workout');
    } catch (err) {
      console.log('do quick workout completeWorkout error: ', err);
      throw new Error();
    }
  };

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
          {`${quickWorkout['name']} Workout`}
        </ThemedText>
        <MyWorkoutListAccordionGrp exercises={quickWorkout['exercises']} />
        <View>
          <ThemedButton variant="contained" onPress={completeWorkout}>
            Complete workout!
          </ThemedButton>
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
