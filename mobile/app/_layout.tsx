import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { PaperProvider } from 'react-native-paper';

import { CombinedDarkTheme, CombinedLightTheme } from '@/constants/theme';
import { WorkoutProvider } from '@/context/WorkoutContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? CombinedDarkTheme : CombinedLightTheme;

  return (
    <WorkoutProvider>
      <PaperProvider theme={theme}>
        <ThemeProvider value={theme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="workout/quick-session/index"
              options={{ title: 'Quick session' }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: 'modal', title: 'Modal' }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </WorkoutProvider>
  );
}
