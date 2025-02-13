import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, useTheme, Surface, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/MainNavigator';

// Mock data for orders
const MOCK_ORDERS = [
  {
    id: 'ORD1234567',
    date: '2024-03-15',
    status: 'delivered',
    total: 299.99,
    items: [
      { name: 'Product 1', quantity: 2, price: 99.99 },
      { name: 'Product 2', quantity: 1, price: 100.01 },
    ],
  },
  {
    id: 'ORD7654321',
    date: '2024-03-14',
    status: 'processing',
    total: 149.99,
    items: [
      { name: 'Product 3', quantity: 1, price: 149.99 },
    ],
  },
  // Add more mock orders as needed
];

type Props = NativeStackScreenProps<MainStackParamList>;

export default function OrderHistoryScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return colors.light.secondary;
      case 'processing':
        return colors.light.primary;
      case 'cancelled':
        return colors.light.error;
      default:
        return colors.light.onSurfaceVariant;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={[theme.typography.h2, styles.headerTitle]}>Order History</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {MOCK_ORDERS.map((order) => (
          <Surface key={order.id} style={styles.orderCard}>
            <Pressable
              style={({ pressed }) => [
                styles.orderCardContent,
                pressed && { opacity: 0.7 },
              ]}
              android_ripple={{ color: theme.colors.onSurfaceVariant }}
            >
              <View style={styles.orderHeader}>
                <View>
                  <Text style={[theme.typography.bodyMedium, styles.orderId]}>
                    Order #{order.id}
                  </Text>
                  <Text style={[theme.typography.bodyMedium, styles.orderDate]}>
                    {formatDate(order.date)}
                  </Text>
                </View>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(order.status) + '20' },
                ]}>
                  <Text style={[
                    theme.typography.caption,
                    styles.statusText,
                    { color: getStatusColor(order.status) },
                  ]}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Text>
                </View>
              </View>

              <View style={styles.itemsList}>
                {order.items.map((item, index) => (
                  <View key={index} style={styles.itemRow}>
                    <View style={styles.itemInfo}>
                      <Text style={[theme.typography.bodyMedium, styles.itemName]}>
                        {item.name}
                      </Text>
                      <Text style={[theme.typography.bodyMedium, styles.itemQuantity]}>
                        Quantity: {item.quantity}
                      </Text>
                    </View>
                    <Text style={[theme.typography.bodyMedium, styles.itemPrice]}>
                      ${item.price.toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.orderFooter}>
                <Text style={[theme.typography.bodyMedium, styles.totalLabel]}>
                  Total Amount:
                </Text>
                <Text style={[theme.typography.h3, styles.totalAmount]}>
                  ${order.total.toFixed(2)}
                </Text>
              </View>

              <View style={styles.actionButtons}>
                <IconButton
                  icon="receipt-outline"
                  size={20}
                  onPress={() => {}}
                  style={styles.actionButton}
                />
                <IconButton
                  icon="chatbubble-outline"
                  size={20}
                  onPress={() => {}}
                  style={styles.actionButton}
                />
                <IconButton
                  icon="share-outline"
                  size={20}
                  onPress={() => {}}
                  style={styles.actionButton}
                />
              </View>
            </Pressable>
          </Surface>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.sm,
  },
  headerTitle: {
    color: colors.light.onSurface,
  },
  placeholder: {
    width: 48,
  },
  content: {
    padding: spacing.md,
  },
  orderCard: {
    marginBottom: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  orderCardContent: {
    padding: spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  orderId: {
    color: colors.light.onSurface,
    fontWeight: 'bold',
  },
  orderDate: {
    color: colors.light.onSurfaceVariant,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  statusText: {
    fontWeight: 'bold',
  },
  itemsList: {
    borderTopWidth: 1,
    borderTopColor: colors.light.outline,
    paddingTop: spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  itemInfo: {
    flex: 1,
    marginRight: spacing.md,
  },
  itemName: {
    color: colors.light.onSurface,
  },
  itemQuantity: {
    color: colors.light.onSurfaceVariant,
  },
  itemPrice: {
    color: colors.light.primary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.light.outline,
  },
  totalLabel: {
    color: colors.light.onSurfaceVariant,
  },
  totalAmount: {
    color: colors.light.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.sm,
  },
  actionButton: {
    margin: 0,
  },
}); 