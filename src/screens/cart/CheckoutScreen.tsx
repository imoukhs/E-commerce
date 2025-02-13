import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, Button, IconButton, useTheme, TextInput, Surface, HelperText, Portal, Dialog, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { useCart } from '../../context/CartContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import type { CustomTheme } from '../../theme/types';

type Props = NativeStackScreenProps<MainStackParamList, 'Checkout'>;

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface ShippingForm {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

const { width } = Dimensions.get('window');

export default function CheckoutScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const { items, getTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingInfo, setShippingInfo] = useState<ShippingForm>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentForm>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });
  const [errors, setErrors] = useState<{
    shipping?: { [key in keyof ShippingForm]?: string };
    payment?: { [key in keyof PaymentForm]?: string };
  }>({});
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const validateShippingForm = () => {
    const newErrors: { [key in keyof ShippingForm]?: string } = {};
    let isValid = true;
    
    if (!shippingInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }
    if (!shippingInfo.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (!shippingInfo.city.trim()) {
      newErrors.city = 'City is required';
      isValid = false;
    }
    if (!shippingInfo.state.trim()) {
      newErrors.state = 'State is required';
      isValid = false;
    }
    if (!shippingInfo.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
      isValid = false;
    } else if (!/^\d{5}(-\d{4})?$/.test(shippingInfo.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code format';
      isValid = false;
    }
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(shippingInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number format';
      isValid = false;
    }

    setErrors(prev => ({ ...prev, shipping: newErrors }));
    return isValid;
  };

  const validatePaymentForm = () => {
    const newErrors: { [key in keyof PaymentForm]?: string } = {};
    let isValid = true;
    
    if (!paymentInfo.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
      isValid = false;
    } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
      isValid = false;
    }
    
    if (!paymentInfo.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
      isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentInfo.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date format (MM/YY)';
      isValid = false;
    }
    
    if (!paymentInfo.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
      isValid = false;
    } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
      newErrors.cvv = 'Invalid CVV';
      isValid = false;
    }
    
    if (!paymentInfo.cardHolderName.trim()) {
      newErrors.cardHolderName = 'Cardholder name is required';
      isValid = false;
    }

    setErrors(prev => ({ ...prev, payment: newErrors }));
    return isValid;
  };

  const handleNext = () => {
    if (currentStep === 'shipping') {
      if (validateShippingForm()) {
        setCurrentStep('payment');
        setErrors({});  // Clear errors when moving to next step
      }
    } else if (currentStep === 'payment') {
      if (validatePaymentForm()) {
        setCurrentStep('review');
        setErrors({});  // Clear errors when moving to next step
      }
    }
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
    return formatted.substring(0, 19); // 16 digits + 3 spaces
  };

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return text;
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const orderId = Math.random().toString(36).substring(7);
      clearCart(); // Clear the cart after successful order
      
      navigation.replace('OrderConfirmation', { orderId });
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setLoading(false);
      setShowConfirmation(false);
    }
  };

  const renderStepIndicator = () => (
    <Surface style={[styles.stepIndicator, { backgroundColor: theme.colors.surface }]} elevation={1}>
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <View style={[
            styles.stepCircle,
            { backgroundColor: theme.colors.primary }
          ]}>
            <MaterialCommunityIcons name="truck-delivery" size={20} color={theme.colors.onPrimary} />
          </View>
          <Text style={[styles.stepText, { color: theme.colors.primary }]}>Shipping</Text>
        </View>
        <View style={[styles.stepLine, { backgroundColor: currentStep !== 'shipping' ? theme.colors.primary : theme.colors.surfaceVariant }]} />
        <View style={styles.step}>
          <View style={[
            styles.stepCircle,
            { backgroundColor: currentStep !== 'shipping' ? theme.colors.primary : theme.colors.surfaceVariant }
          ]}>
            <MaterialCommunityIcons name="credit-card" size={20} color={currentStep !== 'shipping' ? theme.colors.onPrimary : theme.colors.onSurfaceVariant} />
          </View>
          <Text style={[styles.stepText, { color: currentStep !== 'shipping' ? theme.colors.primary : theme.colors.onSurfaceVariant }]}>Payment</Text>
        </View>
        <View style={[styles.stepLine, { backgroundColor: currentStep === 'review' ? theme.colors.primary : theme.colors.surfaceVariant }]} />
        <View style={styles.step}>
          <View style={[
            styles.stepCircle,
            { backgroundColor: currentStep === 'review' ? theme.colors.primary : theme.colors.surfaceVariant }
          ]}>
            <MaterialCommunityIcons name="check-circle" size={20} color={currentStep === 'review' ? theme.colors.onPrimary : theme.colors.onSurfaceVariant} />
          </View>
          <Text style={[styles.stepText, { color: currentStep === 'review' ? theme.colors.primary : theme.colors.onSurfaceVariant }]}>Review</Text>
        </View>
      </View>
    </Surface>
  );

  const renderShippingForm = () => (
    <Surface style={[styles.formCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
      <View style={styles.formHeader}>
        <MaterialCommunityIcons name="truck-delivery" size={24} color={theme.colors.primary} />
        <Text style={[theme.typography.titleLarge, styles.formTitle, { color: theme.colors.onSurface }]}>
          Shipping Information
        </Text>
      </View>
      <Divider style={[styles.divider, { backgroundColor: theme.colors.surfaceVariant }]} />
      <View style={styles.formContent}>
        <TextInput
          label="Full Name"
          value={shippingInfo.fullName}
          onChangeText={(text) => {
            setShippingInfo({ ...shippingInfo, fullName: text });
            setErrors(prev => ({ ...prev, shipping: { ...prev.shipping, fullName: undefined } }));
          }}
          mode="outlined"
          style={styles.input}
          error={!!errors.shipping?.fullName}
          left={<TextInput.Icon icon="account" />}
        />
        {errors.shipping?.fullName && (
          <HelperText type="error" visible={true}>
            {errors.shipping.fullName}
          </HelperText>
        )}
        <TextInput
          label="Address"
          value={shippingInfo.address}
          onChangeText={(text) => setShippingInfo({ ...shippingInfo, address: text })}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="home" />}
        />
        <View style={styles.row}>
          <TextInput
            label="City"
            value={shippingInfo.city}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, city: text })}
            mode="outlined"
            style={[styles.input, styles.flex1]}
          />
          <View style={styles.spacer} />
          <TextInput
            label="State"
            value={shippingInfo.state}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, state: text })}
            mode="outlined"
            style={[styles.input, styles.flex1]}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            label="ZIP Code"
            value={shippingInfo.zipCode}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, zipCode: text })}
            mode="outlined"
            style={[styles.input, styles.flex1]}
            keyboardType="numeric"
          />
          <View style={styles.spacer} />
          <TextInput
            label="Phone"
            value={shippingInfo.phone}
            onChangeText={(text) => setShippingInfo({ ...shippingInfo, phone: text })}
            mode="outlined"
            style={[styles.input, styles.flex1]}
            keyboardType="phone-pad"
            left={<TextInput.Icon icon="phone" />}
          />
        </View>
      </View>
    </Surface>
  );

  const renderPaymentForm = () => (
    <Surface style={[styles.formCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
      <View style={styles.formHeader}>
        <MaterialCommunityIcons name="credit-card" size={24} color={theme.colors.primary} />
        <Text style={[theme.typography.titleLarge, styles.formTitle, { color: theme.colors.onSurface }]}>
          Payment Details
        </Text>
      </View>
      <Divider style={[styles.divider, { backgroundColor: theme.colors.surfaceVariant }]} />
      <View style={styles.formContent}>
        <TextInput
          label="Card Number"
          value={paymentInfo.cardNumber}
          onChangeText={(text) => {
            const formatted = formatCardNumber(text);
            setPaymentInfo({ ...paymentInfo, cardNumber: formatted });
            setErrors(prev => ({ ...prev, payment: { ...prev.payment, cardNumber: undefined } }));
          }}
          mode="outlined"
          style={styles.input}
          error={!!errors.payment?.cardNumber}
          keyboardType="numeric"
          left={<TextInput.Icon icon="credit-card" />}
        />
        {errors.payment?.cardNumber && (
          <HelperText type="error" visible={true}>
            {errors.payment.cardNumber}
          </HelperText>
        )}
        <View style={styles.row}>
          <TextInput
            label="Expiry Date"
            value={paymentInfo.expiryDate}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, expiryDate: text })}
            mode="outlined"
            style={[styles.input, styles.flex1]}
            placeholder="MM/YY"
          />
          <View style={styles.spacer} />
          <TextInput
            label="CVV"
            value={paymentInfo.cvv}
            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cvv: text })}
            mode="outlined"
            style={[styles.input, styles.flex1]}
            keyboardType="numeric"
            secureTextEntry
          />
        </View>
        <TextInput
          label="Cardholder Name"
          value={paymentInfo.cardHolderName}
          onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cardHolderName: text })}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="account" />}
        />
      </View>
    </Surface>
  );

  const renderOrderReview = () => (
    <Surface style={[styles.formCard, { backgroundColor: theme.colors.surface }]} elevation={1}>
      <View style={styles.formHeader}>
        <MaterialCommunityIcons name="clipboard-list" size={24} color={theme.colors.primary} />
        <Text style={[theme.typography.titleLarge, styles.formTitle, { color: theme.colors.onSurface }]}>
          Order Summary
        </Text>
      </View>
      <Divider style={[styles.divider, { backgroundColor: theme.colors.surfaceVariant }]} />
      <View style={styles.formContent}>
        <Surface style={[styles.reviewSection, { backgroundColor: theme.colors.surfaceVariant }]}>
          <View style={styles.reviewHeader}>
            <MaterialCommunityIcons name="truck-delivery" size={20} color={theme.colors.primary} />
            <Text style={[theme.typography.titleMedium, styles.reviewTitle, { color: theme.colors.onSurface }]}>
              Shipping Address
            </Text>
          </View>
          <Text style={[styles.reviewText, { color: theme.colors.onSurfaceVariant }]}>{shippingInfo.fullName}</Text>
          <Text style={[styles.reviewText, { color: theme.colors.onSurfaceVariant }]}>{shippingInfo.address}</Text>
          <Text style={[styles.reviewText, { color: theme.colors.onSurfaceVariant }]}>
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
          </Text>
          <Text style={[styles.reviewText, { color: theme.colors.onSurfaceVariant }]}>{shippingInfo.phone}</Text>
        </Surface>

        <Surface style={[styles.reviewSection, { backgroundColor: theme.colors.surfaceVariant }]}>
          <View style={styles.reviewHeader}>
            <MaterialCommunityIcons name="credit-card" size={20} color={theme.colors.primary} />
            <Text style={[theme.typography.titleMedium, styles.reviewTitle, { color: theme.colors.onSurface }]}>
              Payment Method
            </Text>
          </View>
          <Text style={[styles.reviewText, { color: theme.colors.onSurfaceVariant }]}>
            **** **** **** {paymentInfo.cardNumber.slice(-4)}
          </Text>
          <Text style={[styles.reviewText, { color: theme.colors.onSurfaceVariant }]}>
            {paymentInfo.cardHolderName}
          </Text>
        </Surface>

        <Surface style={[styles.reviewSection, { backgroundColor: theme.colors.surfaceVariant }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.reviewText, { color: theme.colors.onSurfaceVariant }]}>Subtotal</Text>
            <Text style={[styles.reviewText, { color: theme.colors.onSurfaceVariant }]}>
              ₦{getTotal().toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.reviewText, { color: theme.colors.onSurfaceVariant }]}>Shipping</Text>
            <Text style={[styles.reviewText, { color: theme.colors.onSurfaceVariant }]}>₦0.00</Text>
          </View>
          <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={[theme.typography.titleMedium, { color: theme.colors.onSurface }]}>Total</Text>
            <Text style={[theme.typography.titleMedium, { color: theme.colors.primary }]}>
              ₦{getTotal().toFixed(2)}
            </Text>
          </View>
        </Surface>
      </View>
    </Surface>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={handleBack}
          />
          <Text style={[theme.typography.titleLarge, styles.headerTitle]}>
            Checkout
          </Text>
          <View style={styles.headerRight} />
        </View>

        {renderStepIndicator()}

        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {currentStep === 'shipping' && renderShippingForm()}
          {currentStep === 'payment' && renderPaymentForm()}
          {currentStep === 'review' && renderOrderReview()}
        </ScrollView>

        <Surface style={styles.footer} elevation={2}>
          {currentStep !== 'review' ? (
            <Button
              mode="contained"
              onPress={handleNext}
              style={styles.button}
              loading={loading}
              disabled={loading}
            >
              Continue
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={handlePlaceOrder}
              style={styles.button}
              loading={loading}
              disabled={loading}
            >
              Place Order (₦{getTotal().toFixed(2)})
            </Button>
          )}
        </Surface>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    height: 56,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 48, // Same as IconButton for balance
  },
  content: {
    flex: 1,
  },
  footer: {
    padding: spacing.md,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  button: {
    marginTop: spacing.sm,
  },
  stepIndicator: {
    margin: spacing.md,
    borderRadius: 12,
    padding: spacing.md,
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  step: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  stepText: {
    fontSize: 12,
    fontWeight: '500',
  },
  stepLine: {
    flex: 1,
    height: 2,
    marginHorizontal: spacing.sm,
  },
  formCard: {
    borderRadius: 16,
    marginBottom: spacing.md,
  },
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  formTitle: {
    marginLeft: spacing.sm,
  },
  formContent: {
    padding: spacing.md,
  },
  input: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  spacer: {
    width: spacing.md,
  },
  divider: {
    height: 1,
  },
  reviewSection: {
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  reviewTitle: {
    marginLeft: spacing.sm,
  },
  reviewText: {
    fontSize: 14,
    marginBottom: spacing.xs,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  totalRow: {
    marginTop: spacing.sm,
  },
}); 