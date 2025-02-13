import type { MD3Theme } from 'react-native-paper';
import type { TextStyle } from 'react-native';

interface TypographyStyle extends Omit<TextStyle, 'fontWeight'> {
  fontSize: number;
  fontWeight: '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | 'normal' | 'bold';
  lineHeight: number;
}

interface Typography {
  h1: TypographyStyle;
  h2: TypographyStyle;
  h3: TypographyStyle;
  titleLarge: TypographyStyle;
  titleMedium: TypographyStyle;
  titleSmall: TypographyStyle;
  bodyLarge: TypographyStyle;
  bodyMedium: TypographyStyle;
  bodySmall: TypographyStyle;
  labelLarge: TypographyStyle;
  labelMedium: TypographyStyle;
  labelSmall: TypographyStyle;
  caption: TypographyStyle;
  level3: TypographyStyle;
}

export interface CustomTheme extends MD3Theme {
  typography: Typography;
} 