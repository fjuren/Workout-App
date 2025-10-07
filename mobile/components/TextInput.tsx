import { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput as Input } from 'react-native-paper';

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

export const TextInput = ({ errorText, ...props }: Props) => {
  const theme = useAppTheme();
  const styles = useStyles(theme);

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        // selectionColor={theme}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

const useStyles = (theme: AppTheme) =>
  useMemo(
    () =>
      StyleSheet.create({
        container: {
          width: '100%',
          marginVertical: 12,
        },
        input: {
          backgroundColor: theme.colors.surface,
        },
        error: {
          fontSize: 14,
          color: theme.colors.error,
          paddingHorizontal: 4,
          paddingTop: 4,
        },
      }),
    [theme]
  );

export default memo(TextInput);
