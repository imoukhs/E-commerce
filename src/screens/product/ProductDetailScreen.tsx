import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Image, Pressable } from 'react-native';
import { Text, Surface, Button, IconButton, useTheme, Divider, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import { Rating } from '../../components/common/Rating';
import { useCart } from '../../context/CartContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import type { CustomTheme } from '../../theme/types';

type Props = NativeStackScreenProps<MainStackParamList, 'ProductDetail'>;

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');
  const { addItem } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    addItem({
      ...product,
      variant: selectedVariant,
    }, quantity);
    navigation.navigate('Cart');
  };

  const handleBuyNow = () => {
    addItem({
      ...product,
      variant: selectedVariant,
    }, quantity);
    navigation.navigate('Checkout');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => navigation.goBack()}
            style={[styles.headerButton, { backgroundColor: theme.colors.surface }]}
          />
          <IconButton
            icon={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            onPress={() => setIsFavorite(!isFavorite)}
            style={[styles.headerButton, { backgroundColor: theme.colors.surface }]}
            iconColor={isFavorite ? theme.colors.error : theme.colors.onSurface}
          />
        </View>

        <Surface style={styles.imageContainer} elevation={1}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        </Surface>

        <Surface style={styles.contentContainer} elevation={1}>
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={[theme.typography.titleLarge, { color: theme.colors.onSurface }]}>
                {product.name}
              </Text>
              <View style={styles.ratingContainer}>
                <Rating value={4.5} size={16} />
                <Text style={[theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
                  (128 reviews)
                </Text>
              </View>
            </View>

            <Text style={[theme.typography.titleLarge, styles.price, { color: theme.colors.primary }]}>
              ₦{product.price.toFixed(2)}
            </Text>

            <Text style={[theme.typography.bodyLarge, { color: theme.colors.onSurface }]}>
              {product.description}
            </Text>

            <Divider style={styles.divider} />

            <View style={styles.quantityContainer}>
              <Text style={[theme.typography.titleMedium, { color: theme.colors.onSurface }]}>
                Quantity
              </Text>
              <View style={styles.quantityControls}>
                <IconButton
                  icon="minus"
                  size={20}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  style={styles.quantityButton}
                />
                <Text style={[theme.typography.titleMedium, { color: theme.colors.onSurface }]}>
                  {quantity}
                </Text>
                <IconButton
                  icon="plus"
                  size={20}
                  onPress={() => setQuantity(quantity + 1)}
                  style={styles.quantityButton}
                />
              </View>
            </View>

            <View style={styles.variantsContainer}>
              <Text style={[theme.typography.titleMedium, { color: theme.colors.onSurface }]}>
                Available Options
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.variantsScroll}>
                {['Black', 'White', 'Blue', 'Red'].map((variant) => (
                  <Chip
                    key={variant}
                    selected={selectedVariant === variant}
                    onPress={() => setSelectedVariant(variant)}
                    style={styles.variantChip}
                  >
                    {variant}
                  </Chip>
                ))}
              </ScrollView>
            </View>

            <View style={styles.specifications}>
              <Text style={[theme.typography.titleMedium, { color: theme.colors.onSurface }]}>
                Specifications
              </Text>
              <View style={styles.specGrid}>
                <View style={styles.specItem}>
                  <MaterialCommunityIcons name="weight" size={24} color={theme.colors.primary} />
                  <Text style={[theme.typography.bodyMedium, { color: theme.colors.onSurfaceVariant }]}>
                    Weight: 250g
                  </Text>
                </View>
                <View style={styles.specItem}>
                  <MaterialCommunityIcons name="ruler" size={24} color={theme.colors.primary} />
                  <Text style={[theme.typography.bodyMedium, { color: theme.colors.onSurfaceVariant }]}>
                    Size: 10 x 5 x 2 cm
                  </Text>
                </View>
                <View style={styles.specItem}>
                  <MaterialCommunityIcons name="package-variant" size={24} color={theme.colors.primary} />
                  <Text style={[theme.typography.bodyMedium, { color: theme.colors.onSurfaceVariant }]}>
                    In Stock: Yes
                  </Text>
                </View>
                <View style={styles.specItem}>
                  <MaterialCommunityIcons name="truck-delivery" size={24} color={theme.colors.primary} />
                  <Text style={[theme.typography.bodyMedium, { color: theme.colors.onSurfaceVariant }]}>
                    Free Shipping
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Surface>
      </ScrollView>

      <Surface style={styles.footer} elevation={4}>
        <Button
          mode="outlined"
          onPress={handleAddToCart}
          style={styles.cartButton}
          contentStyle={styles.buttonContent}
        >
          Add to Cart
        </Button>
        <Button
          mode="contained"
          onPress={handleBuyNow}
          style={styles.buyButton}
          contentStyle={styles.buttonContent}
        >
          Buy Now
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    zIndex: 1,
  },
  headerButton: {
    borderRadius: 12,
  },
  imageContainer: {
    width: width,
    height: width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  content: {
    padding: spacing.lg,
  },
  titleContainer: {
    marginBottom: spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: spacing.xs,
  },
  price: {
    marginBottom: spacing.md,
  },
  divider: {
    marginVertical: spacing.lg,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  quantityButton: {
    margin: 0,
  },
  variantsContainer: {
    marginBottom: spacing.lg,
  },
  variantsScroll: {
    marginTop: spacing.sm,
  },
  variantChip: {
    marginRight: spacing.sm,
  },
  specifications: {
    marginBottom: spacing.lg,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    width: '45%',
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
  },
  cartButton: {
    flex: 1,
  },
  buyButton: {
    flex: 1,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
}); 