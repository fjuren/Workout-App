import { ThemedText } from '@/components/ThemedText';
import { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import { errorTitle, getUserErrorMessage } from '@/utils/errorMessages';
import { ErrorCode } from '@shared/types/errors';
import * as React from 'react';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dialog, Portal } from 'react-native-paper';
import { ThemedButton } from './ThemedButton';

// const ErrorDialog = (error: Record<string, any> ) => {
export default function ErrorDialog({error}: {error: any}) {
  const theme = useAppTheme();
  const styles = useStyles(theme);
  const [visible, setVisible] = React.useState(false);

  console.log('DIALOG ERROR: ', error)

  const showDialog = () => setVisible(true);
  React.useEffect(() => {
    showDialog()
  }, [error])

  const hideDialog = () => setVisible(false);

  if (!error) return null;

  const errorMessage = getUserErrorMessage(error.code)

  const getErrorDetails = () => {
    switch (error.code) {
      case ErrorCode.INTERNAL_SERVER_ERROR:
        return {
          title: `${error.status} ${errorTitle}`,
          message: 'Unable to reach the server. Check your internet connection.',
          canRetry: true
        };
      case ErrorCode.VALIDATION_ERROR:
        return {
           title: `${error.status} ${errorTitle}`,
          message: error.message,
          canRetry: false
        };
      case ErrorCode.UNAUTHORIZED:
        return {
          title: `${error.status} ${errorTitle}`,
          message: errorMessage,
          canRetry: false
        };
      case ErrorCode.NOT_FOUND:
        return {
          title: `${error.status} ${errorTitle}`,
          message: error.message,
          canRetry: false
        };
      case ErrorCode.DATABASE_ERROR: 
        return {
          title: `${error.status} ${errorTitle}`,
          message: errorMessage,
          canRetry: true
        };
      default:
        return {
          title: errorTitle,
          message: 'Sorry, something went wrong. Please try again later',
          canRetry: true
        };
    }
  };

  const details = getErrorDetails();

  return (
      <View>
        {/* <Button onPress={showDialog}>Show Dialog</Button> */}
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog} style={styles.errorContainer}>
            <Dialog.Title style={styles.errorText}>
              {details.title}
            </Dialog.Title>
            <Dialog.Content>
              <ThemedText variant="bodyMedium" style={styles.errorText}>
                {details.message}
              </ThemedText>
            </Dialog.Content>
            <Dialog.Actions>
              <ThemedButton variant='custom' onPress={hideDialog} labelStyle={styles.errorText}>Ok</ThemedButton>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
  );
};

const useStyles = (theme: AppTheme) =>
  useMemo(
    () =>
      StyleSheet.create({
        errorContainer: {
          backgroundColor: theme.colors.errorContainer,
          borderRadius: theme.borderRadius.md,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
        },        
        errorText: {
          color: theme.colors.onErrorContainer
        }
      }),
    [theme]
  );