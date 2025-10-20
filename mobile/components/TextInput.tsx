import { AppTheme, TypographyVariant } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import React, { memo, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TextInput as Input, TextInputProps } from 'react-native-paper';

// type Props = React.ComponentProps<typeof Input> & { errorText?: string };
interface ThemedTextInputProps extends TextInputProps {
  variant?: TypographyVariant;
  color?: string;
  errorText?: string;
}

export const TextInput: React.FC<ThemedTextInputProps> = ({
  errorText,
  testID,
  variant = 'bodyMedium',
  color,
  style,
  ...props
}) => {
  const theme = useAppTheme();
  const styles = useStyles(theme, variant, color);

  return (
    <>
      <Input
        style={[styles.input, style]}
        testID={testID}
        // selectionColor={theme}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </>
  );
};

const useStyles = (
  theme: AppTheme,
  variant: TypographyVariant,
  color?: string
) =>
  useMemo(
    () =>
      StyleSheet.create({
        input: {
          ...theme.typography[variant],
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: theme.borderRadius.md,
          textAlignVertical: 'top',
          color: color || theme.colors.onSurface,
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
