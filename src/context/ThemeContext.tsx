import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import type { CustomTheme } from '../theme/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: CustomTheme;
}

const THEME_PREFERENCE_KEY = '@theme_preference';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    // Load saved theme preference
    const loadThemePreference = async () => {
      try {
        const savedPreference = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (savedPreference !== null) {
          setIsDarkMode(savedPreference === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };

    loadThemePreference();
  }, []);

  const toggleTheme = useCallback(async () => {
    try {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      await AsyncStorage.setItem(THEME_PREFERENCE_KEY, newMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  }, [isDarkMode]);

  const baseTheme = isDarkMode ? MD3DarkTheme : MD3LightTheme;
  const themeColors = isDarkMode ? colors.dark : colors.light;

  const theme: CustomTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      ...themeColors,
      background: isDarkMode ? colors.dark.background : colors.light.background,
      surface: isDarkMode ? colors.dark.surface : colors.light.surface,
      onSurface: isDarkMode ? colors.dark.onSurface : colors.light.onSurface,
      onBackground: isDarkMode ? colors.dark.onBackground : colors.light.onBackground,
      primary: isDarkMode ? colors.dark.primary : colors.light.primary,
      onPrimary: isDarkMode ? colors.dark.onPrimary : colors.light.onPrimary,
      primaryContainer: isDarkMode ? colors.dark.primaryContainer : colors.light.primaryContainer,
      onPrimaryContainer: isDarkMode ? colors.dark.onPrimaryContainer : colors.light.onPrimaryContainer,
      secondary: isDarkMode ? colors.dark.secondary : colors.light.secondary,
      onSecondary: isDarkMode ? colors.dark.onSecondary : colors.light.onSecondary,
      secondaryContainer: isDarkMode ? colors.dark.secondaryContainer : colors.light.secondaryContainer,
      onSecondaryContainer: isDarkMode ? colors.dark.onSecondaryContainer : colors.light.onSecondaryContainer,
      error: isDarkMode ? colors.dark.error : colors.light.error,
      onError: isDarkMode ? colors.dark.onError : colors.light.onError,
      errorContainer: isDarkMode ? colors.dark.errorContainer : colors.light.errorContainer,
      onErrorContainer: isDarkMode ? colors.dark.onErrorContainer : colors.light.onErrorContainer,
      surfaceVariant: isDarkMode ? colors.dark.surfaceVariant : colors.light.surfaceVariant,
      onSurfaceVariant: isDarkMode ? colors.dark.onSurfaceVariant : colors.light.onSurfaceVariant,
      outline: isDarkMode ? colors.dark.outline : colors.light.outline,
      elevation: isDarkMode ? {
        level0: 'transparent',
        level1: colors.dark.elevation.level1,
        level2: colors.dark.elevation.level2,
        level3: colors.dark.elevation.level3,
        level4: colors.dark.elevation.level4,
        level5: colors.dark.elevation.level5,
      } : {
        level0: 'transparent',
        level1: colors.light.elevation.level1,
        level2: colors.light.elevation.level2,
        level3: colors.light.elevation.level3,
        level4: colors.light.elevation.level4,
        level5: colors.light.elevation.level5,
      },
    },
    typography,
    dark: isDarkMode,
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 