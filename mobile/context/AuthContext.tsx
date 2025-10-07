// from supabase docs: https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth?queryGroups=database-method&database-method=sql&queryGroups=auth-store&auth-store=secure-store#create-the-authcontext

import { Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export type AuthData = {
  session?: Session | null;
  profile?: any | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthData>({
  session: undefined,
  profile: undefined,
  isLoading: true,
  isLoggedIn: false,
});

export const useAuthContext = () => useContext(AuthContext);
