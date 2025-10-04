import type { TypographyVariant } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

interface ThemedTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'bodyMedium',
  color,
  style,
  ...props
}) => {
  const theme = useAppTheme();

  const textStyle: TextStyle = {
    ...theme.typography[variant],
    color: color || theme.colors.onBackground,
  };

  return <Text style={[textStyle, style]} {...props} />;
};
