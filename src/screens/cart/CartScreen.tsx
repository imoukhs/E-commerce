import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, Button, IconButton, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import CartItem from '../../components/cart/CartItem';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import { useCart } from '../../context/CartContext';

type Props = NativeStackScreenProps<MainStackParamList, 'Cart'>;

export default function CartScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const { items, getTotal } = useCart();

  const subtotal = getTotal();
  const shipping = items.length > 0 ? 10.00 : 0;
  const total = subtotal + shipping;

  const handleStartShopping = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
        <View style={styles.emptyContainer}>
          <Text style={[theme.typography.titleLarge, styles.emptyTitle, { color: theme.colors.onSurface }]}>
            Your cart is empty
          </Text>
          <Text style={[theme.typography.bodyLarge, styles.emptyText, { color: theme.colors.onSurfaceVariant }]}>
            Add items to your cart to start shopping
          </Text>
          <Button
            mode="contained"
            onPress={handleStartShopping}
            style={styles.shopButton}
          >
            Start Shopping
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <Surface style={styles.headerSurface} elevation={1}>
        <View style={styles.headerContent}>
          <Text style={[theme.typography.titleLarge, { color: theme.colors.onSurface }]}>
            Shopping Cart
          </Text>
          <Text style={[theme.typography.bodyLarge, { color: theme.colors.onSurfaceVariant }]}>
            {items.length} items
          </Text>
        </View>
      </Surface>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <Surface key={item.id} style={styles.cartItemSurface} elevation={1}>
            <View style={styles.cartItemContent}>
              <CartItem item={item} />
            </View>
          </Surface>
        ))}
      </ScrollView>

      <Surface style={styles.summarySurface} elevation={2}>
        <View style={styles.summaryContent}>
          <View style={styles.summaryRow}>
            <Text style={[theme.typography.bodyLarge, { color: theme.colors.onSurfaceVariant }]}>
              Subtotal
            </Text>
            <Text style={[theme.typography.bodyLarge, { color: theme.colors.onSurface }]}>
              ${subtotal.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[theme.typography.bodyLarge, { color: theme.colors.onSurfaceVariant }]}>
              Shipping
            </Text>
            <Text style={[theme.typography.bodyLarge, { color: theme.colors.onSurface }]}>
              ${shipping.toFixed(2)}
            </Text>
          </View>
          <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
          <View style={styles.summaryRow}>
            <Text style={[theme.typography.titleMedium, { color: theme.colors.onSurface }]}>
              Total
            </Text>
            <Text style={[theme.typography.titleMedium, { color: theme.colors.primary }]}>
              ${total.toFixed(2)}
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Checkout')}
            style={styles.checkoutButton}
            contentStyle={styles.buttonContent}
          >
            Proceed to Checkout
          </Button>
        </View>
      </Surface>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  shopButton: {
    minWidth: 200,
  },
  headerSurface: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 12,
  },
  headerContent: {
    padding: spacing.md,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  cartItemSurface: {
    marginBottom: spacing.md,
    borderRadius: 12,
  },
  cartItemContent: {
    borderRadius: 12,
  },
  summarySurface: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  summaryContent: {
    padding: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  divider: {
    marginVertical: spacing.md,
  },
  checkoutButton: {
    marginTop: spacing.lg,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
}); 