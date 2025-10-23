import { supabase } from '@/config/supabase';
import React from 'react';
import { ThemedButton } from '../ThemedButton';

async function onSignOutButtonPress() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Error signing out:', error);
  }
}

export default function SignOutButton() {
  return (
    <ThemedButton
      mode="outlined"
      variant="outlined"
      onPress={onSignOutButtonPress}
    >
      Sign out
    </ThemedButton>
  );
}
