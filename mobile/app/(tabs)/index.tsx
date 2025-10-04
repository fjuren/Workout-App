import { ThemedText } from '@/components/ThemedText';
import { useAppTheme } from '@/hooks/use-app-theme';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
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

      {/* </View> */}
    </SafeAreaView>

    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    //   headerImage={
    //     <Image
    //       source={require('@/assets/images/partial-react-logo.png')}
    //       style={styles.reactLogo}
    //     />
    //   }
    // >
    //   <View style={styles.titleContainer}>
    //     <ThemedText type="title">Welcome!</ThemedText>
    //     <HelloWave />
    //   </View>
    //   <View style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 1: Try it</ThemedText>
    //     <ThemedText>
    //       Edit{' '}
    //       <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{' '}
    //       to see changes. Press{' '}
    //       <ThemedText type="defaultSemiBold">
    //         {Platform.select({
    //           ios: 'cmd + d',
    //           android: 'cmd + m',
    //           web: 'F12',
    //         })}
    //       </ThemedText>{' '}
    //       to open developer tools.
    //     </ThemedText>
    //   </View>
    //   <View style={styles.stepContainer}>
    //     <Link href="/modal">
    //       <Link.Trigger>
    //         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
    //       </Link.Trigger>
    //       <Link.Preview />
    //       <Link.Menu>
    //         <Link.MenuAction
    //           title="Action"
    //           icon="cube"
    //           onPress={() => alert('Action pressed')}
    //         />
    //         <Link.MenuAction
    //           title="Share"
    //           icon="square.and.arrow.up"
    //           onPress={() => alert('Share pressed')}
    //         />
    //         <Link.Menu title="More" icon="ellipsis">
    //           <Link.MenuAction
    //             title="Delete"
    //             icon="trash"
    //             destructive
    //             onPress={() => alert('Delete pressed')}
    //           />
    //         </Link.Menu>
    //       </Link.Menu>
    //     </Link>

    //     <ThemedText>
    //       {`Tap the Explore tab to learn more about what's included in this starter app.`}
    //     </ThemedText>
    //   </View>
    //   <View style={styles.stepContainer}>
    //     <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
    //     <ThemedText>
    //       {`When you're ready, run `}
    //       <ThemedText type="defaultSemiBold">
    //         npm run reset-project
    //       </ThemedText>{' '}
    //       to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{' '}
    //       directory. This will move the current{' '}
    //       <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
    //       <ThemedText type="defaultSemiBold">app-example</ThemedText>.
    //     </ThemedText>
    //   </View>
    // </ParallaxScrollView>
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
