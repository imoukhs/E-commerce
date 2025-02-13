import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, Button, IconButton, useTheme, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import CartItem from '../../components/cart/CartItem';

// Mock data
const CART_ITEMS = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    price: 99.99,
    quantity: 1,
    image: 'https://via.placeholder.com/300',
  },
  // ... add more items
];

export default function CartScreen() {
  const theme = useTheme<CustomTheme>();

  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10.00;
  const total = subtotal + shipping;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[theme.typography.titleLarge, { color: theme.colors.onBackground }]}>
          Shopping Cart
        </Text>
        <Text style={[theme.typography.bodyLarge, { color: theme.colors.onSurfaceVariant }]}>
          {CART_ITEMS.length} items
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {CART_ITEMS.map((item) => (
          <Surface 
            key={item.id} 
            style={[styles.cartItem, { backgroundColor: theme.colors.surface }]}
            elevation={1}
          >
            <CartItem item={item} />
          </Surface>
        ))}
      </ScrollView>

      <Surface style={[styles.summary, { backgroundColor: theme.colors.surface }]} elevation={2}>
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
          onPress={() => {}}
          style={styles.checkoutButton}
          contentStyle={styles.buttonContent}
        >
          Proceed to Checkout
        </Button>
      </Surface>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  cartItem: {
    marginBottom: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  summary: {
    padding: spacing.lg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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