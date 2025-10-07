import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { supabase } from '@/config/supabase';
import { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyEmailScreen() {
  const params = useLocalSearchParams<{ email: string }>();
  const email = Array.isArray(params.email) ? params.email[0] : params.email;
  const theme = useAppTheme();
  const styles = useStyles(theme);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onResendPressed = async () => {
    setLoading(true);
    setMessage('');
    setError('');

    if (!email) {
      setError('No email found. Please sign up again.');
      setLoading(false);
      return;
    }

    const { error: resendError } = await supabase.auth.resend({
      type: 'signup',
      email: email as string,
    });

    setLoading(false);

    if (resendError) {
      // attempt to catch fake emails from supabase. from docs: "email_address_invalid = Example and test domains are currently not supported. Use a different email address."
      if (resendError.code === 'email_address_invalid') {
        setError(
          'Unable to send verification email. Please try signing up again with a different email address.'
        );
      } else {
        setError(resendError.message);
      }
    } else {
      setMessage('Verification resent!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText variant="titleLarge">Verify Your Email</ThemedText>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.iconContainer}>
            <ThemedText variant="displaySmall">📧</ThemedText>
          </View>
          <View style={styles.iconContainer}>
            <ThemedText variant="bodyLarge">
              Email sent to <b>{email}</b>
            </ThemedText>
          </View>

          <ThemedText style={styles.message}>
            We've sent a verification link to {email}. Please check your inbox
            and click the link to verify your account.
          </ThemedText>

          <ThemedText style={styles.message}>
            Don't forget to check your spam folder if you don't see it in your
            inbox.
          </ThemedText>

          {message ? (
            <Text style={styles.successMessage}>{message}</Text>
          ) : null}

          {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

          <ThemedButton
            mode="outlined"
            onPress={onResendPressed}
            style={styles.button}
            loading={loading}
            disabled={loading}
          >
            Resend Verification Email
          </ThemedButton>

          <View style={styles.row}>
            <Text style={styles.label}>Already verified? </Text>
            <TouchableOpacity
              onPress={() => router.push('/login')}
              disabled={loading}
            >
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
          justifyContent: 'center',
        },
        link: {
          color: theme.colors.tertiary,
        },
        message: {
          color: theme.colors.onSurface,
          textAlign: 'center',
          marginBottom: 16,
          lineHeight: 22,
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
        iconContainer: {
          alignItems: 'center',
          marginBottom: 16,
        },
      }),
    [theme]
  );
