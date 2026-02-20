import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useIsDesktop } from '@/utils/useIsDesktop';
import { useTheme } from '@/utils/theme';
import { HomeIcon, TrophyIcon, PeopleIcon, SettingsIcon } from '@/components/icons';

const TAB_ICONS: Record<string, React.FC<{ size: number; color: string }>> = {
  home: HomeIcon,
  leaderboard: TrophyIcon,
  profile: PeopleIcon,
  settings: SettingsIcon,
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const isDesktop = useIsDesktop();
  const { colors, isDark } = useTheme();

  const items = state.routes.map((route, index) => {
    const { options } = descriptors[route.key];
    const label = (options.title ?? route.name) as string;
    const isFocused = state.index === index;
    const Icon = TAB_ICONS[route.name];

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name, route.params);
      }
    };

    return { key: route.key, label, isFocused, Icon, onPress };
  });

  if (isDesktop) {
    return (
      <View
        style={[
          styles.sidebar,
          {
            backgroundColor: colors.bg.elevated,
            borderRightWidth: 1,
            borderRightColor: colors.border.primary,
          },
        ]}
      >
        <Text
          style={[
            styles.appName,
            { color: colors.green.primary },
          ]}
        >
          EazyEnglish
        </Text>

        <View style={styles.sidebarNav}>
          {items.map(({ key, label, isFocused, Icon, onPress }) => (
            <TouchableOpacity
              key={key}
              onPress={onPress}
              activeOpacity={0.7}
              style={[
                styles.sidebarItem,
                {
                  backgroundColor: isFocused
                    ? isDark
                      ? 'rgba(88, 204, 2, 0.15)'
                      : 'rgba(34, 197, 94, 0.1)'
                    : 'transparent',
                  borderRadius: 12,
                },
              ]}
            >
              {Icon && (
                <Icon
                  size={24}
                  color={isFocused ? colors.green.primary : colors.text.tertiary}
                />
              )}
              <Text
                style={[
                  styles.sidebarLabel,
                  {
                    color: isFocused ? colors.green.primary : colors.text.secondary,
                    fontWeight: isFocused ? '700' : '500',
                  },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  // Mobile bottom tab bar
  return (
    <View
      style={[
        styles.bottomBar,
        {
          backgroundColor: colors.bg.elevated,
          borderTopWidth: 1,
          borderTopColor: colors.border.primary,
          shadowColor: isDark ? '#ffffff' : '#000000',
        },
      ]}
    >
      {items.map(({ key, label, isFocused, Icon, onPress }) => (
        <TouchableOpacity
          key={key}
          onPress={onPress}
          activeOpacity={0.7}
          style={styles.bottomBarItem}
        >
          <View
            style={{
              backgroundColor: isFocused
                ? isDark
                  ? 'rgba(88, 204, 2, 0.2)'
                  : 'rgba(34, 197, 94, 0.1)'
                : 'transparent',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 20,
            }}
          >
            {Icon && (
              <Icon
                size={24}
                color={isFocused ? colors.green.primary : colors.text.tertiary}
              />
            )}
          </View>
          <Text
            style={[
              styles.bottomBarLabel,
              {
                color: isFocused ? colors.green.primary : colors.text.tertiary,
              },
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  // Desktop sidebar — no absolute positioning, sits in normal flow
  sidebar: {
    width: 240,
    paddingTop: 32,
    paddingHorizontal: 12,
    height: '100%' as any,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sidebarNav: {
    gap: 4,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
  },
  sidebarLabel: {
    fontSize: 16,
  },

  // Mobile bottom bar
  bottomBar: {
    flexDirection: 'row',
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    elevation: 10,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bottomBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBarLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
});
