import TextInput from '@/components/TextInput';
import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { emailValidator } from '@/utils/validation';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const theme = useAppTheme();
  const styles = useStyles(theme);
  const router = useRouter();

  const [email, setEmail] = useState({ value: '', error: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSendPressed = () => {
    setLoading(true);
    setMessage('');
    setError('');

    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      setError('Oops there was an issue. Verify your email.');
      setLoading(false);
      return;
    }

    setMessage('Email sent! Check your email.');
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Logo /> */}

      <ThemedText variant="titleLarge">Restore Password</ThemedText>

      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="E-mail address"
            returnKeyType="done"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          {message ? (
            <Text style={styles.successMessage}>{message}</Text>
          ) : null}

          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

          <ThemedButton mode="contained" onPress={onSendPressed}>
            Send Reset Instructions
          </ThemedButton>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.link}>← Back to login</Text>
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
        successMessage: {
          color: theme.colors.good,
          textAlign: 'center',
          marginTop: 16,
        },
        errorMessage: {
          color: theme.colors.error,
          textAlign: 'center',
          marginTop: 16,
        },
        row: {
          flexDirection: 'row',
          marginTop: 12,
        },
        link: {
          color: theme.colors.tertiary,
        },
      }),
    [theme]
  );
