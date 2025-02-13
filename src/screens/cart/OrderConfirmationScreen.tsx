import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, Button, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'OrderConfirmation'>;

export default function OrderConfirmationScreen({ navigation, route }: Props) {
  const theme = useTheme<CustomTheme>();
  const { orderId } = route.params;

  const handleContinueShopping = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  const handleViewOrders = () => {
    navigation.navigate('OrderHistory');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <Surface style={styles.contentSurface} elevation={1}>
        <View style={styles.content}>
          <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryContainer }]}>
            <MaterialCommunityIcons
              name="check-circle"
              size={64}
              color={theme.colors.primary}
            />
          </View>
          
          <Text style={[theme.typography.titleLarge, styles.title, { color: theme.colors.onSurface }]}>
            Order Confirmed!
          </Text>
          
          <Text style={[theme.typography.bodyLarge, styles.message, { color: theme.colors.onSurfaceVariant }]}>
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </Text>
          
          <Text style={[theme.typography.titleMedium, styles.orderId, { color: theme.colors.primary }]}>
            Order ID: {orderId}
          </Text>
          
          <Text style={[theme.typography.bodyMedium, styles.instruction, { color: theme.colors.onSurfaceVariant }]}>
            You will receive an email confirmation with order details and tracking information once your order ships.
          </Text>
          
          <View style={styles.buttons}>
            <Button
              mode="contained"
              onPress={handleContinueShopping}
              style={styles.button}
            >
              Continue Shopping
            </Button>
            
            <Button
              mode="outlined"
              onPress={handleViewOrders}
              style={styles.button}
            >
              View Orders
            </Button>
          </View>
        </View>
      </Surface>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentSurface: {
    margin: spacing.lg,
  },
  content: {
    padding: spacing.xl,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  orderId: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  instruction: {
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
}); 