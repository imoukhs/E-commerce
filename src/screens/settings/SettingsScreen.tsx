import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, List, Switch, useTheme, Surface, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../../theme/spacing';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import type { CustomTheme } from '../../theme/types';

type Props = NativeStackScreenProps<MainStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    orderUpdates: true,
    promotions: false,
    newsletter: false,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    biometricLogin: false,
    locationServices: true,
  });

  const toggleSetting = (
    category: 'notifications' | 'preferences',
    setting: string,
    value: boolean
  ) => {
    if (category === 'notifications') {
      setNotifications(prev => ({
        ...prev,
        [setting]: value,
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [setting]: value,
      }));
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <Surface style={styles.section} elevation={1}>
          <List.Section>
            <List.Subheader>Notifications</List.Subheader>
            <List.Item
              title="Push Notifications"
              description="Enable or disable all notifications"
              left={props => <List.Icon {...props} icon="bell-outline" />}
              right={() => (
                <Switch
                  value={notifications.pushEnabled}
                  onValueChange={(value) =>
                    toggleSetting('notifications', 'pushEnabled', value)
                  }
                />
              )}
            />
            <Divider />
            <List.Item
              title="Order Updates"
              description="Get notified about your order status"
              left={props => <List.Icon {...props} icon="package-variant" />}
              right={() => (
                <Switch
                  value={notifications.orderUpdates}
                  onValueChange={(value) =>
                    toggleSetting('notifications', 'orderUpdates', value)
                  }
                />
              )}
            />
            <Divider />
            <List.Item
              title="Promotions"
              description="Receive special offers and discounts"
              left={props => <List.Icon {...props} icon="tag-outline" />}
              right={() => (
                <Switch
                  value={notifications.promotions}
                  onValueChange={(value) =>
                    toggleSetting('notifications', 'promotions', value)
                  }
                />
              )}
            />
            <Divider />
            <List.Item
              title="Newsletter"
              description="Weekly updates and news"
              left={props => <List.Icon {...props} icon="email-outline" />}
              right={() => (
                <Switch
                  value={notifications.newsletter}
                  onValueChange={(value) =>
                    toggleSetting('notifications', 'newsletter', value)
                  }
                />
              )}
            />
          </List.Section>
        </Surface>

        <Surface style={[styles.section, { marginTop: spacing.md }]} elevation={1}>
          <View style={styles.sectionInner}>
            <View style={styles.sectionContent}>
              <List.Section>
                <List.Subheader>App Preferences</List.Subheader>
                <List.Item
                  title="Dark Mode"
                  description="Switch between light and dark theme"
                  left={props => <List.Icon {...props} icon="theme-light-dark" />}
                  right={() => (
                    <Switch
                      value={preferences.darkMode}
                      onValueChange={(value) =>
                        toggleSetting('preferences', 'darkMode', value)
                      }
                    />
                  )}
                />
                <Divider />
                <List.Item
                  title="Biometric Login"
                  description="Use fingerprint or face recognition"
                  left={props => <List.Icon {...props} icon="fingerprint" />}
                  right={() => (
                    <Switch
                      value={preferences.biometricLogin}
                      onValueChange={(value) =>
                        toggleSetting('preferences', 'biometricLogin', value)
                      }
                    />
                  )}
                />
                <Divider />
                <List.Item
                  title="Location Services"
                  description="Enable location-based features"
                  left={props => <List.Icon {...props} icon="map-marker-outline" />}
                  right={() => (
                    <Switch
                      value={preferences.locationServices}
                      onValueChange={(value) =>
                        toggleSetting('preferences', 'locationServices', value)
                      }
                    />
                  )}
                />
              </List.Section>
            </View>
          </View>
        </Surface>

        <Surface style={[styles.section, { marginTop: spacing.md }]} elevation={1}>
          <List.Section>
            <List.Subheader>Security</List.Subheader>
            <List.Item
              title="Change Password"
              left={props => <List.Icon {...props} icon="lock-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Two-Factor Authentication"
              left={props => <List.Icon {...props} icon="shield-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Privacy Settings"
              left={props => <List.Icon {...props} icon="eye-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('PrivacySecurity')}
            />
          </List.Section>
        </Surface>

        <Surface style={[styles.section, { marginTop: spacing.md }]} elevation={1}>
          <List.Section>
            <List.Subheader>About</List.Subheader>
            <List.Item
              title="App Version"
              description="1.0.0"
              left={props => <List.Icon {...props} icon="information-outline" />}
            />
            <Divider />
            <List.Item
              title="Terms of Service"
              left={props => <List.Icon {...props} icon="file-document-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
            <Divider />
            <List.Item
              title="Privacy Policy"
              left={props => <List.Icon {...props} icon="shield-check-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
          </List.Section>
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginHorizontal: spacing.md,
    borderRadius: 16,
  },
  sectionInner: {
    borderRadius: 16,
  },
  sectionContent: {
    overflow: 'hidden',
    borderRadius: 16,
  },
}); 