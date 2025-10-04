// hooks/use-app-theme.ts
import { AppTheme } from '@/constants/theme';
import { useTheme } from '@react-navigation/native';
// import { useTheme } from 'react-native-paper';

export const useAppTheme = () => {
  return useTheme() as AppTheme;
};
