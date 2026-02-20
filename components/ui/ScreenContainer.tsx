import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsDesktop } from '@/utils/useIsDesktop';

interface ScreenContainerProps {
  children: React.ReactNode;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({ children }) => {
  const isDesktop = useIsDesktop();

  if (!isDesktop) {
    return <>{children}</>;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.inner}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 600,
  },
});
