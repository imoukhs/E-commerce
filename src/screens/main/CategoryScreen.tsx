import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Text, useTheme, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';

// Temporary mock data
const CATEGORIES = [
  {
    id: '1',
    name: 'Electronics',
    icon: 'laptop',
    subCategories: ['Phones', 'Laptops', 'Tablets', 'Accessories'],
    gradient: ['#FF6B6B', '#FF8E8E'] as const,
  },
  {
    id: '2',
    name: 'Fashion',
    icon: 'shirt',
    subCategories: ['Men', 'Women', 'Kids', 'Accessories'],
    gradient: ['#4FACFE', '#00F2FE'] as const,
  },
  {
    id: '3',
    name: 'Home',
    icon: 'home',
    subCategories: ['Furniture', 'Decor', 'Kitchen', 'Garden'],
    gradient: ['#43E97B', '#38F9D7'] as const,
  },
  {
    id: '4',
    name: 'Beauty',
    icon: 'brush',
    subCategories: ['Skincare', 'Makeup', 'Haircare', 'Fragrance'],
    gradient: ['#FA709A', '#FEE140'] as const,
  },
];

export default function CategoryScreen() {
  const theme = useTheme<CustomTheme>();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryContainer]}
        style={styles.header}
      >
        <Text style={[theme.typography.titleLarge, styles.title, { color: theme.colors.onPrimary }]}>
          Categories
        </Text>
        <Text style={[theme.typography.bodyLarge, styles.subtitle, { color: theme.colors.onPrimary }]}>
          Browse all categories
        </Text>
      </LinearGradient>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {CATEGORIES.map((category) => (
          <Surface 
            key={category.id} 
            style={[styles.categoryCard, { backgroundColor: theme.colors.surface }]}
            elevation={1}
          >
            <Pressable
              onPress={() => toggleCategory(category.id)}
              style={styles.categoryHeader}
            >
              <LinearGradient
                colors={category.gradient}
                style={styles.iconContainer}
              >
                <Ionicons
                  name={category.icon as any}
                  size={24}
                  color={theme.colors.background}
                />
              </LinearGradient>
              <View style={styles.categoryInfo}>
                <Text style={[theme.typography.titleMedium, styles.categoryName, { color: theme.colors.onSurface }]}>
                  {category.name}
                </Text>
                <Text style={[theme.typography.bodySmall, styles.categoryCount, { color: theme.colors.onSurfaceVariant }]}>
                  {category.subCategories.length} subcategories
                </Text>
              </View>
              <Ionicons
                name={expandedCategory === category.id ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={theme.colors.onSurface}
                style={styles.expandIcon}
              />
            </Pressable>

            {expandedCategory === category.id && (
              <View style={styles.subCategoriesContainer}>
                {category.subCategories.map((subCategory, index) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.subCategoryItem,
                      { backgroundColor: theme.colors.surfaceVariant }
                    ]}
                    android_ripple={{ color: theme.colors.onSurfaceVariant }}
                  >
                    <Text style={[theme.typography.bodyMedium, styles.subCategoryText, { color: theme.colors.onSurfaceVariant }]}>
                      {subCategory}
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color={theme.colors.onSurfaceVariant}
                    />
                  </Pressable>
                ))}
              </View>
            )}
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
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    opacity: 0.8,
  },
  scrollContent: {
    padding: spacing.md,
    paddingTop: spacing.lg,
  },
  categoryCard: {
    marginBottom: spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  categoryName: {
    marginBottom: spacing.xs,
  },
  categoryCount: {
    opacity: 0.7,
  },
  expandIcon: {
    marginLeft: spacing.sm,
  },
  subCategoriesContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  subCategoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  subCategoryText: {
    flex: 1,
  },
}); 