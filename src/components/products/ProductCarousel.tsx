import React from 'react';
import { View, StyleSheet, Dimensions, Pressable, Image, ScrollView } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { MainStackParamList, Product } from '../../navigation/types';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

type ProductScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

type Props = {
  products: Product[];
};

export default function ProductCarousel({ products }: Props) {
  const theme = useTheme<CustomTheme>();
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const [activeIndex, setActiveIndex] = React.useState(0);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / ITEM_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((product, index) => (
          <View key={product.id} style={styles.itemWrapper}>
            <Surface style={styles.itemSurface} elevation={2}>
              <View style={styles.itemContainer}>
                <Pressable
                  style={styles.pressable}
                  onPress={() => navigation.navigate('ProductDetail', { product })}
                >
                  <Image source={{ uri: product.image }} style={styles.image} />
                  <View style={styles.overlay}>
                    <View style={styles.content}>
                      <Text style={[theme.typography.h3, styles.name]} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text style={[theme.typography.body, styles.description]} numberOfLines={2}>
                        {product.description}
                      </Text>
                      <Text style={[theme.typography.h2, styles.price]}>
                        ${product.price.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              </View>
            </Surface>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {products.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
  },
  itemWrapper: {
    marginRight: spacing.md,
  },
  itemSurface: {
    borderRadius: 16,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
  },
  pressable: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: spacing.md,
  },
  name: {
    color: colors.light.background,
    marginBottom: spacing.xs,
  },
  description: {
    color: colors.light.background,
    opacity: 0.8,
    marginBottom: spacing.sm,
  },
  price: {
    color: colors.light.background,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.light.surfaceVariant,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: colors.light.primary,
    width: 24,
  },
}); 