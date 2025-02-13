import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Linking } from 'react-native';
import { Text, Surface, TextInput, Button, useTheme as usePaperTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'ContactUs'>;

interface ContactMethod {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
}

export default function ContactUsScreen({ navigation }: Props) {
  const theme = usePaperTheme<CustomTheme>();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const contactMethods: ContactMethod[] = [
    {
      id: 'email',
      title: 'Email Us',
      description: 'support@example.com',
      icon: 'email',
      action: () => {
        Linking.openURL('mailto:support@example.com');
      },
    },
    {
      id: 'phone',
      title: 'Call Us',
      description: '+1 (800) 123-4567',
      icon: 'phone',
      action: () => {
        Linking.openURL('tel:+18001234567');
      },
    },
    {
      id: 'chat',
      title: 'Live Chat',
      description: 'Chat with our support team',
      icon: 'message-text',
      action: () => {
        // TODO: Implement live chat functionality
      },
    },
  ];

  const handleSubmit = () => {
    // TODO: Implement form submission
    console.log({ subject, message });
    setSubject('');
    setMessage('');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Surface style={styles.contactCard}>
            {contactMethods.map((method, index) => (
              <View
                key={method.id}
                style={[
                  styles.contactMethod,
                  index < contactMethods.length - 1 && styles.contactMethodBorder,
                ]}
              >
                <View style={styles.contactMethodContent}>
                  <MaterialCommunityIcons
                    name={method.icon}
                    size={24}
                    color={theme.colors.primary}
                    style={styles.contactIcon}
                  />
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactTitle}>
                      {method.title}
                    </Text>
                    <Text style={[styles.contactDescription, { color: theme.colors.onSurfaceVariant }]}>
                      {method.description}
                    </Text>
                  </View>
                </View>
                <Button
                  mode="outlined"
                  onPress={method.action}
                  style={styles.contactButton}
                >
                  Contact
                </Button>
              </View>
            ))}
          </Surface>

          <Text style={[styles.formTitle, { color: theme.colors.primary }]}>
            Send us a message
          </Text>

          <Surface style={styles.formCard}>
            <TextInput
              label="Subject"
              value={subject}
              onChangeText={setSubject}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Message"
              value={message}
              onChangeText={setMessage}
              mode="outlined"
              multiline
              numberOfLines={6}
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
              disabled={!subject || !message}
            >
              Send Message
            </Button>
          </Surface>

          <Text style={[styles.note, { color: theme.colors.onSurfaceVariant }]}>
            Our support team typically responds within 24 hours
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
  contactCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  contactMethod: {
    padding: spacing.md,
  },
  contactMethodBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  contactMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  contactIcon: {
    marginRight: spacing.md,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  contactDescription: {
    fontSize: 14,
  },
  contactButton: {
    alignSelf: 'flex-start',
  },
  formTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },
  formCard: {
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  input: {
    marginBottom: spacing.md,
  },
  submitButton: {
    marginTop: spacing.sm,
  },
  note: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
}); 