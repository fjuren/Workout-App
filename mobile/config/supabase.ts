// SUPABASE SETUP FOR NATIVE APPS
import { createClient, processLock } from '@supabase/supabase-js';
import Constants from 'expo-constants';
// using SecureStore (recommmended in supabase docs) to handle storage in apps for better security
import * as SecureStore from 'expo-secure-store';
import 'react-native-url-polyfill/auto';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabasePublishableKey =
  Constants.expoConfig?.extra?.supabasePublishableKey;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Missing Supabase environment variables');
}

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => {
    // if we hit this, look at docs and install `aes-js`: https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth?queryGroups=database-method&database-method=sql&queryGroups=auth-store&auth-store=secure-store
    if (value.length > 2048) {
      console.warn(
        `SecureStore value for ${key} is ${value.length} bytes - exceeds 2048 byte limit! check aes library`
      );
    }
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    lock: processLock,
  },
});

const env = Constants.expoConfig?.extra?.env || 'development';
console.log(`Supabase connected in ${env} mode`);
