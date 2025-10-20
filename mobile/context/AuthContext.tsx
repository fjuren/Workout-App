// from supabase docs: https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth?queryGroups=database-method&database-method=sql&queryGroups=auth-store&auth-store=secure-store#create-the-authcontext

import { ProfileSettings, User } from '@/types/user';
import { Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export type AuthData = {
  session?: Session | null;
  user?: User | null;
  profileSettings?: ProfileSettings | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthData>({
  session: undefined,
  user: undefined,
  isLoading: true,
  isLoggedIn: false,
});

export const useAuthContext = () => useContext(AuthContext);
