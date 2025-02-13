import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, List, Switch, useTheme as usePaperTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import { useTheme } from '../../context/ThemeContext';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const theme = usePaperTheme<CustomTheme>();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView>
        <List.Section>
          <List.Subheader style={[theme.typography.titleMedium]}>Appearance</List.Subheader>
          <List.Item
            title="Dark Mode"
            left={props => <List.Icon {...props} icon="theme-light-dark" />}
            right={() => <Switch value={isDarkMode} onValueChange={toggleTheme} />}
          />
        </List.Section>

        <List.Section>
          <List.Subheader style={[theme.typography.titleMedium]}>Preferences</List.Subheader>
          <List.Item
            title="Notifications"
            left={props => <List.Icon {...props} icon="bell-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('Notifications')}
          />
          <List.Item
            title="Language"
            left={props => <List.Icon {...props} icon="translate" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('Language')}
          />
        </List.Section>

        <List.Section>
          <List.Subheader style={[theme.typography.titleMedium]}>Privacy & Security</List.Subheader>
          <List.Item
            title="Privacy & Security Settings"
            left={props => <List.Icon {...props} icon="shield-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('PrivacySecurity')}
          />
        </List.Section>

        <List.Section>
          <List.Subheader style={[theme.typography.titleMedium]}>Support</List.Subheader>
          <List.Item
            title="Help Center"
            left={props => <List.Icon {...props} icon="help-circle-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('HelpCenter')}
          />
          <List.Item
            title="Contact Us"
            left={props => <List.Icon {...props} icon="message-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('ContactUs')}
          />
          <List.Item
            title="About"
            left={props => <List.Icon {...props} icon="information-outline" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
            onPress={() => navigation.navigate('About')}
          />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 