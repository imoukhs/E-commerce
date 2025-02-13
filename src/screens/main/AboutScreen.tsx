import React from 'react';
import { View, ScrollView, StyleSheet, Image, Linking } from 'react-native';
import { Text, Surface, Button, useTheme as usePaperTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'About'>;

interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'website',
    title: 'Website',
    url: 'https://example.com',
    icon: 'web',
  },
  {
    id: 'facebook',
    title: 'Facebook',
    url: 'https://facebook.com/example',
    icon: 'facebook',
  },
  {
    id: 'twitter',
    title: 'Twitter',
    url: 'https://twitter.com/example',
    icon: 'twitter',
  },
  {
    id: 'instagram',
    title: 'Instagram',
    url: 'https://instagram.com/example',
    icon: 'instagram',
  },
];

export default function AboutScreen({ navigation }: Props) {
  const theme = usePaperTheme<CustomTheme>();

  const handleOpenLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleViewPrivacyPolicy = () => {
    // TODO: Implement privacy policy view
  };

  const handleViewTerms = () => {
    // TODO: Implement terms view
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              source={require('../../../assets/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>
              Your App Name
            </Text>
            <Text style={styles.version}>
              Version 1.0.0
            </Text>
          </View>

          <Surface style={styles.descriptionCard}>
            <Text style={styles.description}>
              Your app description goes here. This is a brief overview of what your app does and its main features.
              You can include multiple paragraphs to provide more detailed information about your app.
            </Text>
          </Surface>

          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Connect with us
          </Text>

          <Surface style={styles.socialCard}>
            {SOCIAL_LINKS.map((link, index) => (
              <View
                key={link.id}
                style={[
                  styles.socialLink,
                  index < SOCIAL_LINKS.length - 1 && styles.socialLinkBorder,
                ]}
              >
                <View style={styles.socialLinkContent}>
                  <MaterialCommunityIcons
                    name={link.icon}
                    size={24}
                    color={theme.colors.primary}
                    style={styles.socialIcon}
                  />
                  <Text style={styles.socialTitle}>
                    {link.title}
                  </Text>
                </View>
                <Button
                  mode="outlined"
                  onPress={() => handleOpenLink(link.url)}
                >
                  Visit
                </Button>
              </View>
            ))}
          </Surface>

          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Legal
          </Text>

          <Surface style={styles.legalCard}>
            <Button
              mode="text"
              onPress={handleViewPrivacyPolicy}
              icon="shield-check"
              style={styles.legalButton}
            >
              Privacy Policy
            </Button>
            <View style={styles.legalDivider} />
            <Button
              mode="text"
              onPress={handleViewTerms}
              icon="file-document"
              style={styles.legalButton}
            >
              Terms of Service
            </Button>
          </Surface>

          <Text style={[styles.copyright, { color: theme.colors.onSurfaceVariant }]}>
            © 2024 Your Company. All rights reserved.
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
  header: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: spacing.md,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  version: {
    fontSize: 14,
    opacity: 0.7,
  },
  descriptionCard: {
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },
  socialCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  socialLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  socialLinkBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  socialLinkContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialIcon: {
    marginRight: spacing.md,
  },
  socialTitle: {
    fontSize: 16,
  },
  legalCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  legalButton: {
    justifyContent: 'flex-start',
    height: 56,
  },
  legalDivider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  copyright: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
}); 