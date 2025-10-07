// SUPABASE SETUP FOR WEB
// using asyncStorage (recommmended in supabase docs) to handle storage in browser (for testing)
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { createClient } from '@supabase/supabase-js';
// import Constants from 'expo-constants';
// import 'react-native-url-polyfill/auto';

// const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
// const supabasePublishableKey =
//   Constants.expoConfig?.extra?.supabasePublishableKey;

// if (!supabaseUrl || !supabasePublishableKey) {
//   throw new Error('Missing Supabase environment variables');
// }

// const ExpoWebSecureStoreAdapter = {
//   getItem: (key: string) => {
//     // console.debug('getItem', { key });
//     return AsyncStorage.getItem(key);
//   },
//   setItem: (key: string, value: string) => {
//     return AsyncStorage.setItem(key, value);
//   },
//   removeItem: (key: string) => {
//     return AsyncStorage.removeItem(key);
//   },
// };

// export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
//   auth: {
//     storage: ExpoWebSecureStoreAdapter,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });

import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import 'react-native-url-polyfill/auto';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabasePublishableKey =
  Constants.expoConfig?.extra?.supabasePublishableKey;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error('Missing Supabase environment variables');
}

// Web adapter using browser's localStorage
const ExpoWebStorageAdapter = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null;
    return Promise.resolve(window.localStorage.getItem(key));
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return Promise.resolve();
    return Promise.resolve(window.localStorage.setItem(key, value));
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return Promise.resolve();
    return Promise.resolve(window.localStorage.removeItem(key));
  },
};

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: ExpoWebStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const env = Constants.expoConfig?.extra?.env || 'development';
console.log(`Supabase connected in ${env} mode (web)`);
