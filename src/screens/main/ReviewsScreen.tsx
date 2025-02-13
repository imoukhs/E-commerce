import React from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Surface, IconButton, useTheme as usePaperTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Rating } from '../../components/common/Rating';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'Reviews'>;

interface Review {
  id: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    productName: 'Wireless Earbuds',
    productImage: 'https://via.placeholder.com/100',
    rating: 5,
    comment: 'Great sound quality and comfortable fit. Battery life is impressive!',
    date: '2024-03-15',
    helpful: 12,
  },
  {
    id: '2',
    productName: 'Smart Watch',
    productImage: 'https://via.placeholder.com/100',
    rating: 4,
    comment: 'Good features but battery life could be better. Overall satisfied with the purchase.',
    date: '2024-03-10',
    helpful: 8,
  },
];

export default function ReviewsScreen({ navigation }: Props) {
  const theme = usePaperTheme<CustomTheme>();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {MOCK_REVIEWS.map((review) => (
            <Surface key={review.id} style={styles.reviewCard}>
              <View style={styles.productInfo}>
                <Image source={{ uri: review.productImage }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>
                    {review.productName}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Rating value={review.rating} size={16} />
                    <Text style={styles.dateText}>
                      {formatDate(review.date)}
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.comment}>
                {review.comment}
              </Text>
              <View style={styles.helpfulContainer}>
                <IconButton
                  icon="thumb-up-outline"
                  size={20}
                  onPress={() => {}}
                />
                <Text style={styles.helpfulText}>
                  {review.helpful} people found this helpful
                </Text>
              </View>
              <View style={styles.actions}>
                <IconButton
                  icon="pencil"
                  size={20}
                  onPress={() => {}}
                />
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => {}}
                />
              </View>
            </Surface>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  reviewCard: {
    marginBottom: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
    padding: spacing.md,
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  dateText: {
    fontSize: 12,
    marginLeft: spacing.sm,
    opacity: 0.7,
  },
  comment: {
    fontSize: 14,
    marginBottom: spacing.md,
  },
  helpfulContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  helpfulText: {
    fontSize: 12,
    opacity: 0.7,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
  },
}); 