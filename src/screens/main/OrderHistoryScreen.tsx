import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { Text, Surface, Chip, useTheme, Badge, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'OrderHistory'>;

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
}

// Mock data
const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD001',
    date: '2024-03-20',
    status: 'delivered',
    items: [
      {
        id: '1',
        name: 'Wireless Earbuds',
        quantity: 1,
        price: 99.99,
        image: 'https://via.placeholder.com/100',
      },
      {
        id: '2',
        name: 'Smart Watch',
        quantity: 1,
        price: 199.99,
        image: 'https://via.placeholder.com/100',
      },
    ],
    total: 299.98,
    trackingNumber: 'TRK123456789',
  },
  {
    id: 'ORD002',
    date: '2024-03-18',
    status: 'shipped',
    items: [
      {
        id: '3',
        name: 'Bluetooth Speaker',
        quantity: 1,
        price: 79.99,
        image: 'https://via.placeholder.com/100',
      },
    ],
    total: 79.99,
    trackingNumber: 'TRK987654321',
  },
  // Add more mock orders as needed
];

export default function OrderHistoryScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const [selectedFilter, setSelectedFilter] = useState<OrderStatus | 'all'>('all');

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return '#FFA000';
      case 'processing':
        return '#1976D2';
      case 'shipped':
        return '#7B1FA2';
      case 'delivered':
        return '#43A047';
      case 'cancelled':
        return '#D32F2F';
      default:
        return theme.colors.primary;
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'clock-outline';
      case 'processing':
        return 'progress-check';
      case 'shipped':
        return 'truck-delivery';
      case 'delivered':
        return 'check-circle';
      case 'cancelled':
        return 'close-circle';
      default:
        return 'information';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredOrders = MOCK_ORDERS.filter(
    order => selectedFilter === 'all' || order.status === selectedFilter
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[theme.typography.titleLarge, styles.title]}>Order History</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filters}
        >
          <Chip
            selected={selectedFilter === 'all'}
            onPress={() => setSelectedFilter('all')}
            style={styles.filterChip}
          >
            All
          </Chip>
          {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <Chip
              key={status}
              selected={selectedFilter === status}
              onPress={() => setSelectedFilter(status as OrderStatus)}
              style={styles.filterChip}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Chip>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredOrders.map((order) => (
          <Surface key={order.id} style={styles.orderCard} elevation={1}>
            <View style={styles.orderWrapper}>
              <View style={styles.orderContent}>
                <View style={styles.orderHeader}>
                  <View>
                    <Text style={[theme.typography.titleMedium, styles.orderId]}>
                      Order #{order.id}
                    </Text>
                    <Text style={[theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
                      {formatDate(order.date)}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(order.status) + '20' }
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={getStatusIcon(order.status)}
                      size={14}
                      color={getStatusColor(order.status)}
                      style={styles.statusIcon}
                    />
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(order.status) }
                    ]}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemsContainer}>
                  {order.items.map((item, index) => (
                    <View key={item.id} style={styles.orderItem}>
                      <Image source={{ uri: item.image }} style={styles.itemImage} />
                      <View style={styles.itemDetails}>
                        <Text style={theme.typography.bodyMedium} numberOfLines={1}>
                          {item.name}
                        </Text>
                        <Text style={[theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
                          Qty: {item.quantity} × ₦{item.price.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.orderFooter}>
                  <View style={styles.totalContainer}>
                    <Text style={[theme.typography.bodyMedium, { color: theme.colors.onSurfaceVariant }]}>
                      Total
                    </Text>
                    <Text style={[theme.typography.titleMedium, { color: theme.colors.primary }]}>
                      ₦{order.total.toFixed(2)}
                    </Text>
                  </View>
                  {order.trackingNumber && (
                    <View style={styles.trackingContainer}>
                      <MaterialCommunityIcons
                        name="truck-delivery-outline"
                        size={16}
                        color={theme.colors.primary}
                      />
                      <Text style={[
                        theme.typography.bodySmall,
                        styles.trackingNumber,
                        { color: theme.colors.primary }
                      ]}>
                        {order.trackingNumber}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.actionsContainer}>
                  <IconButton
                    icon="eye"
                    mode="outlined"
                    size={20}
                    onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
                  />
                  {order.status === 'delivered' && (
                    <IconButton
                      icon="star-outline"
                      mode="outlined"
                      size={20}
                      onPress={() => {/* TODO: Navigate to review screen */}}
                    />
                  )}
                  <IconButton
                    icon="chat-outline"
                    mode="outlined"
                    size={20}
                    onPress={() => {/* TODO: Navigate to support chat */}}
                  />
                </View>
              </View>
            </View>
          </Surface>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
  },
  title: {
    marginBottom: spacing.sm,
  },
  filtersContainer: {
    marginBottom: spacing.md,
  },
  filters: {
    paddingRight: spacing.md,
    gap: spacing.sm,
  },
  filterChip: {
    marginRight: spacing.xs,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  orderCard: {
    marginBottom: spacing.md,
    borderRadius: 16,
  },
  orderWrapper: {
    borderRadius: 16,
  },
  orderContent: {
    padding: spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  orderId: {
    marginBottom: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusIcon: {
    marginRight: spacing.xs,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemsContainer: {
    marginBottom: spacing.md,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: spacing.sm,
  },
  itemDetails: {
    flex: 1,
  },
  orderFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: spacing.md,
    marginBottom: spacing.md,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  trackingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackingNumber: {
    marginLeft: spacing.xs,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
}); 