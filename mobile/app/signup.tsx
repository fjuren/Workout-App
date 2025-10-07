import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Logo from '../components/Logo';
// import Header from '../components/Header';
import TextInput from '@/components/TextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { supabase } from '@/config/supabase';
import { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from '@/utils/validation';
import { useRouter } from 'expo-router';
import { Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Signup() {
  const theme = useAppTheme();
  const styles = useStyles(theme);
  const router = useRouter();

  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          display_name: name.value,
        },
      },
    });

    setLoading(false);

    if (error) {
      // Check what type of error it is
      if (error.message.toLowerCase().includes('password')) {
        setPassword({ ...password, error: error.message });
      } else if (error.message.toLowerCase().includes('email')) {
        setEmail({ ...email, error: error.message });
      } else {
        // TODO Generic error - add a general error state?
      }
      return;
    }

    // for if email confirmation is required
    if (data.user && !data.session) {
      // redirect to a confirmation screen on email confirmation
      router.push({
        pathname: '/verifyemail',
        // set query param for request email resend on verification page
        params: { email: email.value },
      });
    } else {
      // user is logged in, go to home
      router.push('/');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Logo /> */}

      <ThemedText variant="titleLarge">Create Account</ThemedText>

      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />

          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />

          <ThemedButton
            mode="contained"
            onPress={onSignUpPressed}
            style={styles.button}
          >
            Sign Up
          </ThemedButton>

          <View style={styles.row}>
            <Text style={styles.label}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
}

const useStyles = (theme: AppTheme) =>
  useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          padding: theme.spacing.md,
          backgroundColor: theme.colors.background,
          gap: theme.spacing.md,
        },
        card: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.borderRadius.md,
        },
        label: {
          color: theme.colors.onBackground,
        },
        button: {
          marginTop: 24,
        },
        row: {
          flexDirection: 'row',
          marginTop: 4,
        },
        link: {
          color: theme.colors.tertiary,
        },
      }),
    [theme]
  );
