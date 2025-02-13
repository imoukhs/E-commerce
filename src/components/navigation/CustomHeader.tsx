import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';

interface CustomHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showBack,
  onBack,
  rightIcon,
  onRightPress,
}) => {
  const theme = useTheme<CustomTheme>();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {showBack && (
            <IconButton
              icon={() => (
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color={colors.light.onSurface}
                />
              )}
              onPress={onBack}
              style={styles.backButton}
            />
          )}
          <Text style={[theme.typography.h2, styles.title]} numberOfLines={1}>
            {title}
          </Text>
        </View>
        {rightIcon && (
          <IconButton
            icon={() => (
              <Ionicons
                name={rightIcon as any}
                size={24}
                color={colors.light.onSurface}
              />
            )}
            onPress={onRightPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.outline,
    ...Platform.select({
      ios: {
        shadowColor: colors.light.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  content: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: spacing.xs,
  },
  title: {
    flex: 1,
    color: colors.light.onSurface,
  },
}); 