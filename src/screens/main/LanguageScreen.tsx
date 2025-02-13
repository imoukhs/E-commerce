import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, RadioButton, useTheme as usePaperTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'Language'>;

interface Language {
  id: string;
  name: string;
  nativeName: string;
  code: string;
}

const LANGUAGES: Language[] = [
  {
    id: 'en',
    name: 'English',
    nativeName: 'English',
    code: 'en-US',
  },
  {
    id: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    code: 'es-ES',
  },
  {
    id: 'fr',
    name: 'French',
    nativeName: 'Français',
    code: 'fr-FR',
  },
  {
    id: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    code: 'de-DE',
  },
  {
    id: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    code: 'it-IT',
  },
  {
    id: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    code: 'pt-PT',
  },
  {
    id: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    code: 'ru-RU',
  },
  {
    id: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    code: 'zh-CN',
  },
  {
    id: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    code: 'ja-JP',
  },
  {
    id: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    code: 'ko-KR',
  },
];

export default function LanguageScreen({ navigation }: Props) {
  const theme = usePaperTheme<CustomTheme>();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageChange = (languageId: string) => {
    setSelectedLanguage(languageId);
    // TODO: Implement language change functionality
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Surface style={styles.languageCard}>
            {LANGUAGES.map((language, index) => (
              <View
                key={language.id}
                style={[
                  styles.languageItem,
                  index < LANGUAGES.length - 1 && styles.languageItemBorder,
                ]}
              >
                <View style={styles.languageInfo}>
                  <Text style={styles.languageName}>
                    {language.name}
                  </Text>
                  <Text style={[styles.nativeName, { color: theme.colors.onSurfaceVariant }]}>
                    {language.nativeName}
                  </Text>
                </View>
                <RadioButton
                  value={language.id}
                  status={selectedLanguage === language.id ? 'checked' : 'unchecked'}
                  onPress={() => handleLanguageChange(language.id)}
                  color={theme.colors.primary}
                />
              </View>
            ))}
          </Surface>
          <Text style={[styles.note, { color: theme.colors.onSurfaceVariant }]}>
            Note: Changing the language will restart the app
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  languageCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  languageItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  nativeName: {
    fontSize: 14,
    opacity: 0.7,
  },
  note: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.lg,
    fontStyle: 'italic',
  },
}); 