// from supabase docs: https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth?queryGroups=database-method&database-method=sql&queryGroups=auth-store&auth-store=secure-store#create-the-splashscreencontroller

import { useAuthContext } from '@/context/AuthContext';
import { SplashScreen } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export function SplashScreenController() {
  const { isLoading } = useAuthContext();

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}
