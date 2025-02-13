import React from 'react';
import { View, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Text, useTheme, Surface, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import type { CustomTheme } from '../../theme/types';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - spacing.md * 3) / 2;
const IMAGE_HEIGHT = CARD_WIDTH * 1.2;

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const theme = useTheme<CustomTheme>();
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const handlePress = () => {
    navigation.navigate('ProductDetail', { product: { ...product, category: 'default' } });
  };

  return (
    <View style={styles.wrapper}>
      <Surface style={styles.container} elevation={2}>
        <View style={styles.innerContainer}>
          <Pressable 
            onPress={handlePress}
            style={({ pressed }) => [
              styles.pressable,
              pressed && { opacity: 0.9 }
            ]}
            android_ripple={{ color: theme.colors.onSurfaceVariant }}
          >
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.image }} style={styles.image} />
              <View style={styles.overlay}>
                <IconButton
                  icon={() => (
                    <Ionicons name="heart-outline" size={20} color={theme.colors.onSurface} />
                  )}
                  size={36}
                  onPress={() => {}}
                  style={styles.favoriteButton}
                />
              </View>
            </View>
            <View style={styles.details}>
              <View style={styles.priceContainer}>
                <Text style={[theme.typography.h3, styles.price]}>
                  ₦{product.price.toFixed(2)}
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color={theme.colors.primary} />
                  <Text style={[theme.typography.caption, styles.rating]}>4.5</Text>
                </View>
              </View>
              <Text style={[theme.typography.bodyMedium, styles.name]} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={[theme.typography.caption, styles.description]} numberOfLines={2}>
                {product.description}
              </Text>
            </View>
          </Pressable>
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: CARD_WIDTH,
    margin: spacing.sm,
  },
  container: {
    borderRadius: 16,
  },
  innerContainer: {
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: colors.light.surface,
  },
  pressable: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: spacing.xs,
  },
  favoriteButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 0,
  },
  details: {
    padding: spacing.md,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  price: {
    color: colors.light.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.primaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
  },
  rating: {
    color: colors.light.onPrimaryContainer,
    marginLeft: spacing.xs,
  },
  name: {
    color: colors.light.onSurface,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.light.onSurfaceVariant,
  },
});

export default ProductCard; 