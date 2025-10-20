import { CombinedDarkTheme, CombinedLightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, Portal } from 'react-native-paper';

import { SplashScreenController } from '@/components/splash-screen-controller';

import { useAuthContext } from '@/context/AuthContext';
import { WorkoutProvider } from '@/context/DoQuickWorkoutContext';
import { MultiStepWorkoutProvider } from '@/context/MultiStepWorkoutContext';
import AuthProvider from '@/providers/AuthProvider';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigator() {
  const { isLoggedIn } = useAuthContext();

  return (
    <>
      <Stack>
        {/* public routes */}
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen
            name="forgotPassword"
            options={{ headerShown: false }}
          />
        </Stack.Protected>

        {/* protected routes */}
        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="workout/quick-workout/index"
            options={{ title: 'Quick Workout' }}
          />
          <Stack.Screen
            name="workout/quick-workout-do/index"
            options={{ title: 'Do Quick Workout' }}
          />
          <Stack.Screen
            name="workout/multi-day-workout-plan/step-1"
            options={{ title: 'Workout Plan - Step 1' }}
          />
          <Stack.Screen
            name="workout/multi-day-workout-plan/step-2"
            options={{ title: 'Workout Plan - Step 2' }}
          />
          <Stack.Screen
            name="workout/multi-day-workout-plan/step-3"
            options={{ title: 'Workout Plan - Step 3' }}
          />
          <Stack.Screen
            name="modal"
            options={{ presentation: 'modal', title: 'Modal' }}
          />
        </Stack.Protected>
        <Stack.Screen name="+not-found" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <WorkoutProvider>
      <MultiStepWorkoutProvider>
        <PaperProvider theme={theme}>
          <ThemeProvider value={theme}>
            <AuthProvider>
              <Portal.Host>
                <SplashScreenController />
                <RootNavigator />
              </Portal.Host>
              <StatusBar style="auto" />
            </AuthProvider>
          </ThemeProvider>
        </PaperProvider>
      </MultiStepWorkoutProvider>
    </WorkoutProvider>
  );
}
