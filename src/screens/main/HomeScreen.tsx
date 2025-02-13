import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, RefreshControl, Pressable, Image } from 'react-native';
import { Text, useTheme, Surface, IconButton, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import ProductCarousel from '../../components/products/ProductCarousel';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList } from '../../navigation/types';
import CategoryGrid from '../../components/products/CategoryGrid';

// Temporary mock data
const FEATURED_PRODUCTS = [
  { id: '1', name: 'Premium Wireless Headphones', price: 199.99, image: 'https://via.placeholder.com/300', description: 'High-quality wireless headphones with noise cancellation' },
  { id: '2', name: 'Smart Watch Series 5', price: 299.99, image: 'https://via.placeholder.com/300', description: 'Advanced smartwatch with health monitoring' },
  { id: '3', name: 'Ultra HD Camera', price: 599.99, image: 'https://via.placeholder.com/300', description: 'Professional-grade digital camera' },
];

const SPECIAL_OFFERS = [
  { id: '1', name: 'Summer Sale', discount: '30% OFF', image: 'https://via.placeholder.com/300', endDate: '2024-06-30' },
  { id: '2', name: 'Flash Deal', discount: '50% OFF', image: 'https://via.placeholder.com/300', endDate: '2024-04-01' },
];

const RECENT_PRODUCTS = [
  { id: '4', name: 'Wireless Earbuds', price: 79.99, image: 'https://via.placeholder.com/300', description: 'True wireless earbuds with premium sound' },
  { id: '5', name: 'Smart Home Hub', price: 129.99, image: 'https://via.placeholder.com/300', description: 'Control your smart home devices' },
  { id: '6', name: 'Fitness Tracker', price: 89.99, image: 'https://via.placeholder.com/300', description: 'Track your daily activities and health' },
];

const CATEGORIES = [
  {
    id: '1',
    name: 'Electronics',
    icon: 'laptop',
    color: '#1E90FF',
  },
  // ... add more categories
];

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<MainTabParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSearch = () => {
    navigation.getParent()?.navigate('Search');
  };

  const handleSpecialOfferPress = (offer: typeof SPECIAL_OFFERS[0]) => {
    // Navigate to special offer details or apply filter
    console.log('Special offer pressed:', offer);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={[theme.typography.titleLarge, { color: theme.colors.onBackground }]}>
            Welcome to
          </Text>
          <Text style={[theme.typography.titleLarge, { color: theme.colors.primary }]}>
            Redeemer's Marketplace
          </Text>
        </View>

        <Surface style={styles.featuredSurface} elevation={1}>
          <View style={styles.featuredContent}>
            <Text style={[theme.typography.titleMedium, styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Featured Products
            </Text>
            <ProductCarousel products={FEATURED_PRODUCTS} />
          </View>
        </Surface>

        <View style={styles.categoriesSection}>
          <Text style={[theme.typography.titleMedium, styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Shop by Category
          </Text>
          <CategoryGrid categories={CATEGORIES} />
        </View>

        <Surface style={styles.specialOffersSurface} elevation={1}>
          <View style={styles.specialOffersContent}>
            <View style={styles.sectionHeader}>
              <Text style={[theme.typography.titleLarge, { color: theme.colors.onSurface }]}>
                Special Offers
              </Text>
              <Button mode="text" onPress={() => {}}>See All</Button>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.specialOffersContainer}
            >
              {SPECIAL_OFFERS.map((offer) => (
                <Pressable
                  key={offer.id}
                  onPress={() => handleSpecialOfferPress(offer)}
                >
                  <LinearGradient
                    colors={[theme.colors.primary, theme.colors.primaryContainer]}
                    style={styles.specialOfferCard}
                  >
                    <Text style={[theme.typography.titleMedium, { color: theme.colors.onPrimary }]}>
                      {offer.name}
                    </Text>
                    <Text style={[theme.typography.bodySmall, { color: theme.colors.onPrimary }]}>
                      {offer.discount}
                    </Text>
                    <Text style={[theme.typography.bodySmall, { color: theme.colors.onPrimary }]}>
                      Ends {new Date(offer.endDate).toLocaleDateString()}
                    </Text>
                  </LinearGradient>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Surface>

        <Surface style={styles.recentSurface} elevation={1}>
          <View style={styles.recentContent}>
            <View style={styles.sectionHeader}>
              <Text style={[theme.typography.titleLarge, { color: theme.colors.onSurface }]}>
                Recent Products
              </Text>
              <Button mode="text" onPress={() => {}}>See All</Button>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentProductsContainer}
            >
              {RECENT_PRODUCTS.map((product) => (
                <Pressable
                  key={product.id}
                  style={[styles.recentProductCard, { backgroundColor: theme.colors.surface }]}
                  onPress={() => navigation.getParent()?.navigate('ProductDetail', { product })}
                >
                  <Image source={{ uri: product.image }} style={styles.recentProductImage} />
                  <View style={styles.recentProductInfo}>
                    <Text style={[theme.typography.bodyMedium, styles.recentProductName, { color: theme.colors.onSurface }]} numberOfLines={2}>
                      {product.name}
                    </Text>
                    <Text style={[theme.typography.titleMedium, styles.recentProductPrice, { color: theme.colors.primary }]}>
                      ${product.price.toFixed(2)}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Surface>
      </ScrollView>
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
  featuredSurface: {
    marginBottom: spacing.lg,
  },
  featuredContent: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoriesSection: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  specialOffersSurface: {
    marginBottom: spacing.lg,
  },
  specialOffersContent: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  recentSurface: {
    marginBottom: spacing.lg,
  },
  recentContent: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    marginLeft: spacing.md,
  },
  specialOffersContainer: {
    padding: spacing.md,
  },
  specialOfferCard: {
    width: width * 0.7,
    height: 150,
    marginRight: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  recentProductsContainer: {
    padding: spacing.md,
  },
  recentProductCard: {
    width: (width - spacing.md * 4) / 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  recentProductImage: {
    width: '100%',
    height: (width - spacing.md * 4) / 2,
    resizeMode: 'cover',
  },
  recentProductInfo: {
    padding: spacing.sm,
  },
  recentProductName: {
    marginBottom: spacing.xs,
  },
  recentProductPrice: {
    fontWeight: 'bold',
  },
}); 