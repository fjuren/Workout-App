import { AppTheme } from '@/constants/theme';
import { useAppTheme } from '@/hooks/use-app-theme';
import React, { memo, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
// import { getStatusBarHeight } from 'react-native-status-bar-height';

type Props = {
  goBack: () => void;
};

const BackButton = ({ goBack }: Props) => {
  const theme = useAppTheme();
  const styles = useStyles(theme);

  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <Image
        style={[styles.image]}
        source={require('@/app/assets/arrow_back.png')}
      />
    </TouchableOpacity>
  );
};

const useStyles = (theme: AppTheme) =>
  useMemo(
    () =>
      StyleSheet.create({
        container: {
          position: 'absolute',
          top: 10,
          left: 10,
        },
        image: {
          width: 24,
          height: 24,
          color: 'white',
        },
      }),
    [theme]
  );

export default memo(BackButton);
