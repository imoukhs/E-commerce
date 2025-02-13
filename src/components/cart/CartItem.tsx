import React from 'react';
import { View, StyleSheet, Image, Surface } from 'react-native';
import { Text, IconButton, useTheme } from 'react-native-paper';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const theme = useTheme<CustomTheme>();
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <Surface style={styles.surface} elevation={2}>
      <View style={styles.container}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Text 
            style={[theme.typography.bodyLarge, { color: theme.colors.onSurface }]} 
            numberOfLines={2}
          >
            {item.name}
          </Text>
          <Text 
            style={[theme.typography.titleMedium, { color: theme.colors.primary }]}
          >
            ₦{(item.price * item.quantity).toFixed(2)}
          </Text>
          <View style={styles.controls}>
            <View style={styles.quantityControls}>
              <IconButton
                icon="minus"
                size={20}
                onPress={handleDecrement}
                disabled={item.quantity <= 1}
              />
              <Text style={[theme.typography.bodyLarge, { color: theme.colors.onSurface }]}>
                {item.quantity}
              </Text>
              <IconButton
                icon="plus"
                size={20}
                onPress={handleIncrement}
              />
            </View>
            <IconButton
              icon="delete"
              size={20}
              iconColor={theme.colors.error}
              onPress={handleRemove}
            />
          </View>
        </View>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    borderRadius: 8,
  },
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: spacing.md,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CartItem; 