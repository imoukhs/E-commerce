import type { Theme } from '@react-navigation/native';
import type { CustomTheme } from './types';

export const createNavigationTheme = (customTheme: CustomTheme): Theme => ({
  dark: customTheme.dark,
  colors: {
    primary: customTheme.colors.primary,
    background: customTheme.colors.background,
    card: customTheme.colors.surface,
    text: customTheme.colors.onSurface,
    border: customTheme.colors.outline,
    notification: customTheme.colors.error,
  },
  fonts: {
    regular: {
      fontFamily: 'OpenSans-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'OpenSans-Regular',
      fontWeight: '500',
    },
    bold: {
      fontFamily: 'OpenSans-Bold',
      fontWeight: 'bold',
    },
    heavy: {
      fontFamily: 'OpenSans-Bold',
      fontWeight: '900',
    },
  },
}); 