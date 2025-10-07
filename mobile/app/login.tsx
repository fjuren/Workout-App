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
import { emailValidator, passwordValidator } from '@/utils/validation';
import { useRouter } from 'expo-router';
import { Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const theme = useAppTheme();
  const styles = useStyles(theme);
  const router = useRouter();

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    setLoading(false);

    if (error) {
      if (error.message.toLowerCase().includes('invalid login credentials')) {
        // make error generic for some security. could be either email or password wrong
        setEmail({ ...email, error: 'Invalid email or password' });
        setPassword({ ...password, error: 'Invalid email or password' });
      } else if (error.message.toLowerCase().includes('email')) {
        setEmail({ ...email, error: error.message });
      } else {
        setPassword({ ...password, error: error.message });
      }
      return;
    }

    // login succeess
    router.push('/');
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Logo /> */}

      <ThemedText variant="titleLarge">Login</ThemedText>

      <Card style={styles.card}>
        <Card.Content>
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

          <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => router.push('/forgotpassword')}>
              <Text style={styles.link}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

          <ThemedButton mode="contained" onPress={onLoginPressed}>
            Login
          </ThemedButton>

          <View style={styles.row}>
            <Text style={styles.label}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.link}>Sign up</Text>
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
        forgotPassword: {
          width: '100%',
          alignItems: 'flex-end',
          marginBottom: 24,
        },
        row: {
          flexDirection: 'row',
          marginTop: 4,
        },
        label: {
          color: theme.colors.onBackground,
        },
        link: {
          // fontWeight: 'bold',
          color: theme.colors.tertiary,
        },
      }),
    [theme]
  );
