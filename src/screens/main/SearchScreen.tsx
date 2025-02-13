import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ListRenderItem, Animated, Pressable, ScrollView } from 'react-native';
import { Searchbar, Text, useTheme, Surface, IconButton, Chip } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import ProductCard from '../../components/products/ProductCard';
import { CustomTheme } from '../../theme/types';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Temporary mock data
const PRODUCTS: Product[] = [
  { 
    id: '1', 
    name: 'Wireless Earbuds Pro', 
    price: 99.99, 
    image: 'https://via.placeholder.com/300',
    description: 'Premium wireless earbuds with noise cancellation'
  },
  { 
    id: '2', 
    name: 'Smart Watch Series 5', 
    price: 149.99, 
    image: 'https://via.placeholder.com/300',
    description: 'Advanced smartwatch with health tracking'
  },
  { 
    id: '3', 
    name: 'Ultra HD Camera', 
    price: 199.99, 
    image: 'https://via.placeholder.com/300',
    description: 'Professional grade digital camera'
  },
  { 
    id: '4', 
    name: 'Gaming Laptop Pro', 
    price: 1299.99, 
    image: 'https://via.placeholder.com/300',
    description: 'High-performance gaming laptop'
  },
];

// Trending searches
const TRENDING_SEARCHES = [
  'Wireless Earbuds',
  'Smart Watch',
  'Gaming Laptop',
  'Camera',
  'Headphones',
  'Smartphone',
];

// Recent searches
const RECENT_SEARCHES = [
  'Ultra HD Camera',
  'Wireless Charger',
  'Bluetooth Speaker',
  'Power Bank',
];

// Popular categories
const POPULAR_CATEGORIES = [
  { id: '1', name: 'Electronics', icon: 'laptop' },
  { id: '2', name: 'Audio', icon: 'headphones' },
  { id: '3', name: 'Cameras', icon: 'camera' },
  { id: '4', name: 'Gaming', icon: 'gamepad-variant' },
  { id: '5', name: 'Accessories', icon: 'cellphone-link' },
  { id: '6', name: 'Wearables', icon: 'watch-variant' },
];

export default function SearchScreen() {
  const theme = useTheme<CustomTheme>();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredProducts([]);
      return;
    }
    const filtered = PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryPress = (category: string) => {
    setSearchQuery(category);
    onChangeSearch(category);
  };

  const handleSearchPress = (search: string) => {
    setSearchQuery(search);
    onChangeSearch(search);
  };

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard product={item} />
  );

  const renderEmptyState = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Trending Searches */}
        <View style={styles.section}>
          <Text style={[theme.typography.titleMedium, styles.sectionTitle]}>
            Trending Searches
          </Text>
          <View style={styles.chipContainer}>
            {TRENDING_SEARCHES.map((item) => (
              <Chip
                key={item}
                mode="outlined"
                onPress={() => handleSearchPress(item)}
                style={styles.chip}
              >
                {item}
              </Chip>
            ))}
          </View>
        </View>

        {/* Recent Searches */}
        <View style={styles.section}>
          <Text style={[theme.typography.titleMedium, styles.sectionTitle]}>
            Recent Searches
          </Text>
          <Surface style={styles.recentSearchesCard}>
            {RECENT_SEARCHES.map((item, index) => (
              <Pressable
                key={item}
                style={[
                  styles.recentSearchItem,
                  index < RECENT_SEARCHES.length - 1 && styles.recentSearchBorder,
                ]}
                onPress={() => handleSearchPress(item)}
              >
                <View style={styles.recentSearchContent}>
                  <MaterialCommunityIcons
                    name="history"
                    size={20}
                    color={theme.colors.onSurfaceVariant}
                  />
                  <Text style={[theme.typography.bodyMedium, styles.recentSearchText]}>
                    {item}
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={theme.colors.onSurfaceVariant}
                />
              </Pressable>
            ))}
          </Surface>
        </View>

        {/* Popular Categories */}
        <View style={styles.section}>
          <Text style={[theme.typography.titleMedium, styles.sectionTitle]}>
            Popular Categories
          </Text>
          <View style={styles.categoriesGrid}>
            {POPULAR_CATEGORIES.map((category) => (
              <Pressable
                key={category.id}
                style={styles.categoryItem}
                onPress={() => handleCategoryPress(category.name)}
              >
                <Surface style={styles.categoryIconContainer}>
                  <MaterialCommunityIcons
                    name={category.icon as any}
                    size={24}
                    color={theme.colors.primary}
                  />
                </Surface>
                <Text style={[theme.typography.bodyMedium, styles.categoryName]}>
                  {category.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <Surface style={styles.header} elevation={2}>
        <Searchbar
          placeholder="Search products, brands & categories"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
          inputStyle={styles.searchInput}
          iconColor={theme.colors.primary}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          elevation={0}
        />
      </Surface>

      {searchQuery === '' ? (
        renderEmptyState()
      ) : (
        <FlatList<Product>
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
          numColumns={2}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons
                name="magnify"
                size={48}
                color={theme.colors.onSurfaceVariant}
              />
              <Text style={[theme.typography.bodyLarge, styles.emptyText]}>
                No products found for "{searchQuery}"
              </Text>
              <Text style={[theme.typography.bodyMedium, styles.emptySubtext]}>
                Try searching with different keywords
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: spacing.md,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  searchBar: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  searchInput: {
    fontSize: 16,
  },
  content: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
    marginLeft: spacing.xs,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    marginBottom: spacing.xs,
  },
  recentSearchesCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  recentSearchBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  recentSearchContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recentSearchText: {
    marginLeft: spacing.sm,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    elevation: 2,
  },
  categoryName: {
    textAlign: 'center',
  },
  productList: {
    padding: spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.xl * 2,
    padding: spacing.xl,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    textAlign: 'center',
    opacity: 0.7,
  },
}); 