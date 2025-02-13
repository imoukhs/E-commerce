import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { MainStackParamList, Category } from '../../navigation/types';

type CategoryScreenNavigationProp = NativeStackNavigationProp<MainStackParamList>;

type Props = {
  categories: Category[];
};

export default function CategoryGrid({ categories }: Props) {
  const theme = useTheme<CustomTheme>();
  const navigation = useNavigation<CategoryScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <Pressable
          key={category.id}
          style={[styles.categoryItem, { backgroundColor: category.color + '15' }]}
          onPress={() => navigation.navigate('CategoryProducts', { category })}
        >
          <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
            <MaterialCommunityIcons
              name={category.icon as keyof typeof MaterialCommunityIcons.glyphMap}
              size={24}
              color={colors.light.background}
            />
          </View>
          <Text style={[theme.typography.body, styles.categoryName]}>
            {category.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  categoryItem: {
    flex: 1,
    minWidth: '45%',
    aspectRatio: 1.5,
    borderRadius: 12,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryName: {
    color: colors.light.onSurface,
    textAlign: 'center',
  },
}); 