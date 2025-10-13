/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
// required for combining react navigation with Material design 3 (v5)
import merge from 'deepmerge';
import {
  adaptNavigationTheme,
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';

// custom colors
const customColors = {
  dark: {
    primary: '#0891b2', // cyan
    onPrimary: '#ffffff',
    primaryContainer: '#0e7490',
    onPrimaryContainer: '#a5f3fc',

    background: '#0a0f1c', // very dark blue-slate
    onBackground: '#fcfcfc',
    surface: '#121827',
    onSurface: '#f7f8f9',
    surfaceVariant: '#1e2532',
    onSurfaceVariant: '#9ca3af',

    secondary: '#252b36',
    onSecondary: '#ffffff',
    secondaryContainer: '#1e2532',
    onSecondaryContainer: '#e2e8f0',

    tertiary: '#ec4899', // pink
    onTertiary: '#ffffff',
    tertiaryContainer: '#be185d',
    onTertiaryContainer: '#fce7f3',

    outline: '#1e2532',
    error: '#ef4444',            
    onError: '#ffffff',          
    errorContainer: '#4c1d1d',   
    onErrorContainer: '#fecaca', 

    good: '#16a34a',
    bad: '#dc2626',

    elevation: {
      level0: 'transparent',
      level1: '#121827',
      level2: '#1a1f2e',
      level3: '#1e2532',
      level4: '#252b36',
      level5: '#2a303d',
    },
  },

  light: {
    primary: '#0891b2',
    onPrimary: '#ffffff',
    primaryContainer: '#e0f7fa',
    onPrimaryContainer: '#006064',

    background: '#fefefe',
    onBackground: '#1e293b',
    surface: '#ffffff',
    onSurface: '#1e293b',
    surfaceVariant: '#f1f5f9',
    onSurfaceVariant: '#64748b',

    secondary: '#f1f5f9',
    onSecondary: '#334155',
    secondaryContainer: '#e2e8f0',
    onSecondaryContainer: '#1e293b',

    tertiary: '#ec4899',
    onTertiary: '#ffffff',
    tertiaryContainer: '#fce7f3',
    onTertiaryContainer: '#831843',

    outline: '#94a3b8',
    error: '#dc2626',
    onError: '#ffffff',
    errorContainer: '#fef2f2',
    onErrorContainer: '#991b1b',

    good: '#16a34a',
    bad: '#dc2626',
  },
};

// custom paper theme. See docs: https://callstack.github.io/react-native-paper/docs/guides/theming/
const CustomLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...customColors.light,
  },
};

const CustomDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...customColors.dark,
  },
};

// adapt navigation themes. See material design 3 docs: https://callstack.github.io/react-native-paper/docs/guides/theming-with-react-navigation#customizing-theme
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

// adapt navigation themes with custom colors. See docs: https://reactnavigation.org/docs/themes/
const CustomNavigationLightTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    primary: customColors.light.primary,
    background: customColors.light.background,
    card: customColors.light.surface,
    text: customColors.light.onSurface,
    border: customColors.light.outline,
    notification: customColors.light.primary,
  },
};

const CustomNavigationDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: customColors.dark.primary,
    background: customColors.dark.background,
    card: customColors.dark.surface,
    text: customColors.dark.onSurface,
    border: customColors.dark.outline,
    notification: customColors.dark.primary,
  },
};

// spacing is based on 8pt grid
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// Typography scale for non-Paper components
export const typography = {
  // Headlines
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '400' as const,
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '400' as const,
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400' as const,
  },
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '400' as const,
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400' as const,
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400' as const,
  },
  // Titles
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500' as const,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as const,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  // Labels
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500' as const,
  },
  // Body
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
  },
} as const;

// Other design tokens
export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// combine design tokens
const baseDesignTokens = {
  spacing,
  typography,
  borderRadius,
  shadows,
  fonts: Fonts,
};

// combine base design tokens, paper & navigation themes in order to use both together
export const CombinedLightTheme = merge.all([
  CustomLightTheme,
  CustomNavigationLightTheme,
  baseDesignTokens,
]) as typeof CustomLightTheme &
  typeof CustomNavigationLightTheme &
  typeof baseDesignTokens;

export const CombinedDarkTheme = merge.all([
  CustomDarkTheme,
  CustomNavigationDarkTheme,
  baseDesignTokens,
]) as typeof CustomDarkTheme &
  typeof CustomNavigationDarkTheme &
  typeof baseDesignTokens;

export type TypographyVariant = keyof typeof typography;
// added typeof CombinedLightTheme since they carry the same type structure; only the values differ
export type AppTheme = typeof CombinedLightTheme;
