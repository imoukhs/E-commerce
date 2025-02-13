import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Text, FAB, Surface, useTheme, Searchbar, Chip, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'ProductManagement'>;

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  status: 'active' | 'draft' | 'out_of_stock';
}

// Mock data - replace with actual API call
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    price: 29999,
    stock: 50,
    category: 'Electronics',
    image: 'https://via.placeholder.com/100',
    status: 'active',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 49999,
    stock: 30,
    category: 'Electronics',
    image: 'https://via.placeholder.com/100',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bluetooth Speaker',
    price: 19999,
    stock: 0,
    category: 'Electronics',
    image: 'https://via.placeholder.com/100',
    status: 'out_of_stock',
  },
];

export default function ProductManagementScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'draft' | 'out_of_stock'>('all');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || product.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAddProduct = () => {
    navigation.navigate('AddProduct');
  };

  const handleEditProduct = (product: Product) => {
    navigation.navigate('EditProduct', { productId: product.id });
  };

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return theme.colors.primary;
      case 'draft':
        return theme.colors.secondary;
      case 'out_of_stock':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <Surface style={styles.productCard} elevation={1}>
      <View style={styles.productContent}>
        <View style={styles.productInfo}>
          <Text style={[theme.typography.titleMedium, { color: theme.colors.onSurface }]}>
            {item.name}
          </Text>
          <Text style={[theme.typography.bodyMedium, { color: theme.colors.primary }]}>
            ₦{(item.price / 100).toLocaleString()}
          </Text>
          <View style={styles.productMeta}>
            <Text style={[theme.typography.bodySmall, { color: theme.colors.onSurfaceVariant }]}>
              Stock: {item.stock}
            </Text>
            <Chip 
              style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) + '20' }]}
              textStyle={{ color: getStatusColor(item.status) }}
            >
              {item.status.replace('_', ' ').toUpperCase()}
            </Chip>
          </View>
        </View>
        <View style={styles.actions}>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => handleEditProduct(item)}
          />
          <IconButton
            icon="delete"
            size={20}
            iconColor={theme.colors.error}
            onPress={() => {/* Handle delete */}}
          />
        </View>
      </View>
    </Surface>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[theme.typography.titleLarge, { color: theme.colors.onBackground }]}>
          My Products
        </Text>
        <Text style={[theme.typography.bodyMedium, { color: theme.colors.onSurfaceVariant }]}>
          {products.length} products
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search products"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>

      <View style={styles.filters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Chip
            selected={selectedFilter === 'all'}
            onPress={() => setSelectedFilter('all')}
            style={styles.filterChip}
          >
            All
          </Chip>
          <Chip
            selected={selectedFilter === 'active'}
            onPress={() => setSelectedFilter('active')}
            style={styles.filterChip}
          >
            Active
          </Chip>
          <Chip
            selected={selectedFilter === 'draft'}
            onPress={() => setSelectedFilter('draft')}
            style={styles.filterChip}
          >
            Draft
          </Chip>
          <Chip
            selected={selectedFilter === 'out_of_stock'}
            onPress={() => setSelectedFilter('out_of_stock')}
            style={styles.filterChip}
          >
            Out of Stock
          </Chip>
        </ScrollView>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleAddProduct}
        color={theme.colors.onPrimary}
      />
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
  searchContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  searchBar: {
    elevation: 0,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  filters: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  filterChip: {
    marginRight: spacing.sm,
  },
  productList: {
    padding: spacing.lg,
  },
  productCard: {
    marginBottom: spacing.md,
    borderRadius: 12,
  },
  productContent: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
  },
  productInfo: {
    flex: 1,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
    gap: spacing.sm,
  },
  statusChip: {
    height: 24,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
  },
}); 