import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, List, Searchbar, Button, useTheme as usePaperTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'HelpCenter'>;

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQ[] = [
  {
    id: '1',
    category: 'Account',
    question: 'How do I reset my password?',
    answer: 'To reset your password, go to the login screen and tap "Forgot Password". Follow the instructions sent to your email to create a new password.',
  },
  {
    id: '2',
    category: 'Account',
    question: 'How do I change my email address?',
    answer: 'You can change your email address in the Profile Settings. Go to Profile > Edit Profile and update your email. Verification may be required.',
  },
  {
    id: '3',
    category: 'Orders',
    question: 'How do I track my order?',
    answer: 'You can track your order in the Order History section. Select the order you want to track and you\'ll see its current status and location.',
  },
  {
    id: '4',
    category: 'Orders',
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of delivery. Items must be unused and in original packaging. Contact support to initiate a return.',
  },
  {
    id: '5',
    category: 'Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.',
  },
  {
    id: '6',
    category: 'Payment',
    question: 'Is my payment information secure?',
    answer: 'Yes, we use industry-standard encryption to protect your payment information. We never store your full card details.',
  },
];

export default function HelpCenterScreen({ navigation }: Props) {
  const theme = usePaperTheme<CustomTheme>();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFAQs = FAQS.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedFAQs = filteredFAQs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  const handleContactSupport = () => {
    navigation.navigate('ContactUs');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Searchbar
            placeholder="Search FAQs"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />

          <Surface style={styles.supportCard}>
            <Text style={styles.supportTitle}>Need more help?</Text>
            <Text style={[styles.supportText, { color: theme.colors.onSurfaceVariant }]}>
              Our support team is here to help you
            </Text>
            <Button
              mode="contained"
              onPress={handleContactSupport}
              style={styles.contactButton}
            >
              Contact Support
            </Button>
          </Surface>

          {Object.entries(groupedFAQs).map(([category, faqs]) => (
            <View key={category} style={styles.section}>
              <Text style={[styles.categoryTitle, { color: theme.colors.primary }]}>
                {category}
              </Text>
              <Surface style={styles.faqCard}>
                {faqs.map((faq, index) => (
                  <List.Accordion
                    key={faq.id}
                    title={faq.question}
                    expanded={expandedId === faq.id}
                    onPress={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                    style={[
                      styles.faqItem,
                      index < faqs.length - 1 && styles.faqItemBorder,
                    ]}
                  >
                    <View style={styles.answerContainer}>
                      <Text style={styles.answer}>
                        {faq.answer}
                      </Text>
                    </View>
                  </List.Accordion>
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
  searchBar: {
    marginBottom: spacing.md,
    elevation: 0,
  },
  supportCard: {
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  supportText: {
    fontSize: 14,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  contactButton: {
    minWidth: 200,
  },
  section: {
    marginBottom: spacing.lg,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },
  faqCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  faqItem: {
    backgroundColor: 'transparent',
  },
  faqItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  answerContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  answer: {
    fontSize: 14,
    lineHeight: 20,
  },
}); 