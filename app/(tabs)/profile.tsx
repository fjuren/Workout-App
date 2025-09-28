import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/use-app-theme';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutScreen() {
  const theme = useAppTheme();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ThemedText
        variant="headlineSmall"
        style={[styles.title, { color: theme.colors.onBackground }]}
      >
        Profile
      </ThemedText>
      <ThemedText variant="bodyLarge" style={styles.comingsoon}>
        Coming soon!
      </ThemedText>

      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
