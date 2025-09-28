import { useAppTheme } from '@/hooks/use-app-theme';
import { Text } from 'react-native-paper';

const SectionLabel = ({ children }: { children: string }) => {
  const theme = useAppTheme();
  return (
    <Text
      variant="bodyMedium"
      style={{
        color: theme.colors.onSurface,
        marginBottom: 12,
        // marginTop: 16,
      }}
    >
      {children}
    </Text>
  );
};

export default SectionLabel;
