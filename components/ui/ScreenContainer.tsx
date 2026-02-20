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
    <View style={styles.inner}>{children}</View>
  );
};

const styles = StyleSheet.create({
  inner: {
    width: '100%',
    maxWidth: 1200,
    marginLeft: 'auto' as any,
    marginRight: 'auto' as any,
  },
});
