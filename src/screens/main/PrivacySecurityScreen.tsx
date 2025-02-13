import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, Switch, Button, useTheme as usePaperTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'PrivacySecurity'>;

interface PrivacySetting {
  id: string;
  title: string;
  description: string;
  type: 'switch' | 'button';
  value?: boolean;
  buttonText?: string;
  onPress?: () => void;
}

interface PrivacySection {
  title: string;
  items: PrivacySetting[];
}

export default function PrivacySecurityScreen({ navigation }: Props) {
  const theme = usePaperTheme<CustomTheme>();
  const [settings, setSettings] = useState<PrivacySection[]>([
    {
      title: 'Privacy',
      items: [
        {
          id: 'profileVisibility',
          title: 'Profile Visibility',
          description: 'Make your profile visible to other users',
          type: 'switch',
          value: true,
        },
        {
          id: 'activityStatus',
          title: 'Activity Status',
          description: 'Show when you were last active',
          type: 'switch',
          value: false,
        },
        {
          id: 'dataSharing',
          title: 'Data Sharing',
          description: 'Share usage data to improve our services',
          type: 'switch',
          value: true,
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          id: 'twoFactor',
          title: 'Two-Factor Authentication',
          description: 'Add an extra layer of security',
          type: 'switch',
          value: false,
        },
        {
          id: 'changePassword',
          title: 'Change Password',
          description: 'Update your account password',
          type: 'button',
          buttonText: 'Change',
          onPress: () => {
            // TODO: Implement change password functionality
          },
        },
        {
          id: 'biometric',
          title: 'Biometric Login',
          description: 'Use fingerprint or face recognition',
          type: 'switch',
          value: true,
        },
      ],
    },
    {
      title: 'Data Management',
      items: [
        {
          id: 'downloadData',
          title: 'Download Your Data',
          description: 'Get a copy of your personal data',
          type: 'button',
          buttonText: 'Download',
          onPress: () => {
            // TODO: Implement data download functionality
          },
        },
        {
          id: 'deleteAccount',
          title: 'Delete Account',
          description: 'Permanently delete your account and data',
          type: 'button',
          buttonText: 'Delete',
          onPress: () => {
            // TODO: Implement account deletion functionality
          },
        },
      ],
    },
  ]);

  const handleToggle = (sectionIndex: number, itemId: string) => {
    setSettings(settings.map((section, index) => {
      if (index === sectionIndex) {
        return {
          ...section,
          items: section.items.map(item => {
            if (item.id === itemId) {
              return { ...item, value: !item.value };
            }
            return item;
          }),
        };
      }
      return section;
    }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {settings.map((section, sectionIndex) => (
            <View key={section.title} style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                {section.title}
              </Text>
              <Surface style={styles.settingsCard}>
                {section.items.map((item, index) => (
                  <View
                    key={item.id}
                    style={[
                      styles.settingItem,
                      index < section.items.length - 1 && styles.settingItemBorder,
                    ]}
                  >
                    <View style={styles.settingInfo}>
                      <Text style={styles.settingTitle}>
                        {item.title}
                      </Text>
                      <Text style={[styles.settingDescription, { color: theme.colors.onSurfaceVariant }]}>
                        {item.description}
                      </Text>
                    </View>
                    {item.type === 'switch' ? (
                      <Switch
                        value={item.value}
                        onValueChange={() => handleToggle(sectionIndex, item.id)}
                      />
                    ) : (
                      <Button
                        mode="outlined"
                        onPress={item.onPress}
                        style={[
                          styles.actionButton,
                          item.id === 'deleteAccount' && styles.deleteButton,
                        ]}
                        textColor={item.id === 'deleteAccount' ? theme.colors.error : undefined}
                      >
                        {item.buttonText}
                      </Button>
                    )}
                  </View>
                ))}
              </Surface>
            </View>
          ))}
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
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },
  settingsCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  settingInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingTitle: {
    fontSize: 16,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  actionButton: {
    minWidth: 100,
  },
  deleteButton: {
    borderColor: 'red',
  },
}); 