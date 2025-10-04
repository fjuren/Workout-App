import { useAppTheme } from '@/hooks/use-app-theme';
import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';

interface ThemedButtonProps extends ButtonProps {
  variant?: 'contained' | 'outlined';
}

// IMPORTANT: ensure you give the themedbutton a mode since this is a native paper component with layered on styling. Recall modes from docs: 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'
export const ThemedButton: React.FC<ThemedButtonProps> = ({
  variant = 'contained',
  style,
  labelStyle,
  ...props
}) => {
  const theme = useAppTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          style: {
            borderColor: theme.colors.outline,
            marginBottom: theme.spacing.sm,
            marginTop: theme.spacing.md,
            borderRadius: theme.spacing.sm,
          },
          labelStyle: {
            color: theme.colors.onSurface,
            fontWeight: 'bold' as const,
          },
        };
      default: // contained
        return {
          style: {
            backgroundColor: theme.colors.primary,
            marginBottom: theme.spacing.sm,
            marginTop: theme.spacing.md,
            borderRadius: theme.spacing.sm,
          },
          labelStyle: {
            color: theme.colors.onPrimary,
            fontWeight: 'bold' as const,
          },
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Button
      {...props}
      style={[variantStyles.style, style]}
      labelStyle={[variantStyles.labelStyle, labelStyle]}
    />
  );
};
