import 'dotenv/config';

export default {
  expo: {
    name:
      process.env.EXPO_PUBLIC_ENV === 'production'
        ? 'WorkoutApp'
        : 'WorkoutApp (Dev)',
    slug: 'WorkoutApp',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'workoutapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier:
        process.env.EXPO_PUBLIC_ENV === 'production'
          ? 'com.yourname.workoutapp'
          : 'com.yourname.workoutapp.dev',
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package:
        process.env.EXPO_PUBLIC_ENV === 'production'
          ? 'com.yourname.workoutapp'
          : 'com.yourname.workoutapp.dev',
    },
    web: {
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      env: process.env.EXPO_PUBLIC_ENV,
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
      supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
      supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    },
  },
};
