import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import { useCart } from '../../context/CartContext';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import type { CustomTheme } from '../../theme/types';

export const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const theme = useTheme<CustomTheme>();
  const { getItemCount } = useCart();
  const cartItemCount = getItemCount();

  const getIcon = (routeName: string, isFocused: boolean): string => {
    switch (routeName) {
      case 'Home':
        return isFocused ? 'home' : 'home-outline';
      case 'Search':
        return isFocused ? 'magnify' : 'magnify';
      case 'Categories':
        return isFocused ? 'view-grid' : 'view-grid-outline';
      case 'Cart':
        return isFocused ? 'cart' : 'cart-outline';
      case 'Profile':
        return isFocused ? 'account' : 'account-outline';
      default:
        return 'circle';
    }
  };

  return (
    <Surface style={[styles.container, { backgroundColor: theme.colors.surface }]} elevation={4}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              style={[
                styles.tab,
                isFocused && styles.activeTab,
              ]}
              onPress={onPress}
            >
              <View style={styles.tabContent}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name={getIcon(route.name, isFocused) as any}
                    size={24}
                    color={isFocused ? theme.colors.primary : theme.colors.onSurfaceVariant}
                  />
                  {route.name === 'Cart' && cartItemCount > 0 && (
                    <View style={[styles.badge, { backgroundColor: theme.colors.error }]}>
                      <Text style={[styles.badgeText, { color: theme.colors.onError }]}>
                        {cartItemCount}
                      </Text>
                    </View>
                  )}
                </View>
                <Text
                  style={[
                    styles.label,
                    { color: isFocused ? theme.colors.primary : theme.colors.onSurfaceVariant },
                    isFocused && styles.activeLabel,
                  ]}
                >
                  {route.name}
                </Text>
                {isFocused && (
                  <View style={[styles.activeIndicator, { backgroundColor: theme.colors.primary }]} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: Platform.OS === 'ios' ? spacing.lg : spacing.sm,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
    position: 'relative',
  },
  activeTab: {
    position: 'relative',
  },
  tabContent: {
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: spacing.xs,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -12,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    marginTop: spacing.xs,
  },
  activeLabel: {
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -spacing.sm - 2,
    width: '50%',
    height: 3,
    borderRadius: 1.5,
  },
}); 