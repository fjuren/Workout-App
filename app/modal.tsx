import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/use-app-theme';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function ModalScreen() {
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      <ThemedText
        variant="titleLarge"
        style={{ color: theme.colors.onSurface, marginBottom: 16 }}
      >
        Feature coming soon!
      </ThemedText>
      <Link
        href="/workout"
        dismissTo
        style={[styles.link, { color: theme.colors.onSurface }]}
      >
        Close
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
