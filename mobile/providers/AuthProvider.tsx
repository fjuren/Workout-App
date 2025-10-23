// from supabase docs: https://supabase.com/docs/guides/auth/quickstarts/with-expo-react-native-social-auth?queryGroups=database-method&database-method=sql&queryGroups=auth-store&auth-store=secure-store#create-the-authprovider

import { supabase } from '@/config/supabase';
import { AuthContext } from '@/context/AuthContext';
import type { Session } from '@supabase/supabase-js';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | undefined | null>();
  const [user, setUser] = useState<any>();
  const [profileSettings, setProfileSettings] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Extract profile fetching logic into a reusable function
  const fetchProfileData = useCallback(async (currentSession: Session) => {
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', currentSession.user.id)
      .single();

    setUser(userData);

    const { data: settingsData } = await supabase
      .from('profile_settings')
      .select('*')
      .eq('user_id', currentSession.user.id)
      .single();

    setProfileSettings(settingsData);
  }, []);

  // Expose a refresh function for components
  const refreshProfile = useCallback(async () => {
    if (session) {
      await fetchProfileData(session);
    }
  }, [session, fetchProfileData]);

  // Fetch the session once, and subscribe to auth state changes
  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      console.log('DATA FROM PROFILE SUPABASE: ', session);

      if (error) {
        console.error('Error fetching session:', error);
      }

      // console.log(session);

      setSession(session);
      setIsLoading(false);
    };

    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', { event: _event, session });
      setSession(session);
    });

    // cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch the profile when the session changes
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);

      if (session) {
        // get data from user table
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser(userData);

        // get data from profile settings table (in future, maybe add this to an onboarding flow? For now, I'm just creating it with default values)
        const { data: settingsData } = await supabase
          .from('profile_settings')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        setProfileSettings(settingsData);
      } else {
        setUser(null);
        setProfileSettings(null);
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        isLoading,
        profileSettings,
        user,
        // hasCompletedOnboarding: profileSettings != null // TODO for when we consider creating an onboarding flow. Out of scope for MVP
        isLoggedIn: session != undefined,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
