import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/use-app-theme';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import SignOutButton from '@/components/auth-buttons/sign-out-button';
import { useAuthContext } from '@/context/AuthContext';

export default function HomeScreen() {

const { user, profileSettings } = useAuthContext();  
// console.log(user);
  const theme = useAppTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ThemedText
        variant="headlineSmall"
        style={[styles.title, { color: theme.colors.onBackground }]}
      >
        Dashboard
      </ThemedText>
      <ThemedText variant="bodyLarge" style={styles.comingsoon}>
        Coming soon!
      </ThemedText>
      <View style={styles.stepContainer}>
        <ThemedText variant="labelMedium">Email</ThemedText>
        <ThemedText>{user?.email}</ThemedText>
        <ThemedText variant="labelMedium">Name</ThemedText>
        <ThemedText>{user?.name}</ThemedText>
      </View>
      <SignOutButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  stepContainer: { gap: 8, marginBottom: 8 },
  title: {
    marginBottom: 24,
    fontWeight: 'bold',
  },
  comingsoon: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 250,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  primaryButton: {
    marginBottom: 8,
    borderRadius: 8,
  },
  secondaryButton: {
    marginBottom: 8,
    marginTop: 16,
    borderRadius: 8,
  },
});
