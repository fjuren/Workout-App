import { useAppTheme } from '@/hooks/use-app-theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomSegmentedButton = ({
  buttonValues,
  selectValue,
}: {
  buttonValues: string[];
  selectValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [value, setValue] = React.useState(buttonValues[0]);
  const theme = useAppTheme();

  const newValue = (buttonValue: string) => {
    selectValue(buttonValue);
    setValue(buttonValue);
  };

  return (
    <View style={[styles.container]}>
      {buttonValues.map((buttonValue, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.button,
            {
              backgroundColor:
                value === buttonValue
                  ? theme.colors.primary
                  : theme.colors.surface,
              borderRadius: theme.borderRadius.sm,
              paddingVertical: theme.spacing.sm,
              paddingHorizontal: theme.spacing.md,
            },
          ]}
          onPress={() => newValue(buttonValue)}
        >
          <Text
            style={[
              theme.typography.labelMedium,
              {
                color:
                  value === buttonValue
                    ? theme.colors.onPrimary
                    : theme.colors.onSurfaceVariant, // Better contrast
              },
            ]}
          >
            {buttonValue}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
});

export default CustomSegmentedButton;
