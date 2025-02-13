import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, IconButton, useTheme as usePaperTheme, FAB, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'PaymentMethods'>;

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
}

const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit',
    cardNumber: '**** **** **** 1234',
    cardHolder: 'John Doe',
    expiryDate: '12/25',
    isDefault: true,
  },
  {
    id: '2',
    type: 'debit',
    cardNumber: '**** **** **** 5678',
    cardHolder: 'John Doe',
    expiryDate: '06/24',
    isDefault: false,
  },
];

export default function PaymentMethodsScreen({ navigation }: Props) {
  const theme = usePaperTheme<CustomTheme>();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(MOCK_PAYMENT_METHODS);

  const handleSetDefault = (id: string) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id,
    })));
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const handleEdit = (method: PaymentMethod) => {
    // TODO: Navigate to edit payment method screen
  };

  const handleAdd = () => {
    // TODO: Navigate to add payment method screen
  };

  const getCardIcon = (type: PaymentMethod['type']) => {
    return type === 'credit' ? 'credit-card' : 'credit-card-outline';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {paymentMethods.map((method) => (
            <Surface key={method.id} style={styles.card}>
              <View>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitle}>
                    <MaterialCommunityIcons
                      name={getCardIcon(method.type)}
                      size={24}
                      color={theme.colors.primary}
                    />
                    <Text style={[theme.typography.titleMedium, styles.cardType]}>
                      {method.type === 'credit' ? 'Credit Card' : 'Debit Card'}
                    </Text>
                    {method.isDefault && (
                      <Surface style={styles.defaultBadge}>
                        <View>
                          <Text style={[theme.typography.labelSmall, styles.defaultText]}>
                            Default
                          </Text>
                        </View>
                      </Surface>
                    )}
                  </View>
                  <View style={styles.cardActions}>
                    <IconButton
                      icon="pencil"
                      size={20}
                      onPress={() => handleEdit(method)}
                    />
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => handleDelete(method.id)}
                    />
                  </View>
                </View>
                <View style={styles.cardDetails}>
                  <Text style={theme.typography.bodyLarge}>
                    {method.cardNumber}
                  </Text>
                  <View style={styles.cardInfo}>
                    <Text style={theme.typography.bodyMedium}>
                      {method.cardHolder}
                    </Text>
                    <Text style={theme.typography.bodyMedium}>
                      Expires: {method.expiryDate}
                    </Text>
                  </View>
                </View>
                {!method.isDefault && (
                  <Button
                    mode="outlined"
                    onPress={() => handleSetDefault(method.id)}
                    style={styles.setDefaultButton}
                  >
                    Set as Default
                  </Button>
                )}
              </View>
            </Surface>
          ))}
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleAdd}
      />
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
  card: {
    marginBottom: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardType: {
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    color: '#4CAF50',
  },
  cardActions: {
    flexDirection: 'row',
  },
  cardDetails: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  setDefaultButton: {
    margin: spacing.md,
    marginTop: 0,
  },
  fab: {
    position: 'absolute',
    margin: spacing.lg,
    right: 0,
    bottom: 0,
  },
}); 