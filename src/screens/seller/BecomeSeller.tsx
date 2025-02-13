import React, { useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Pressable, Platform } from 'react-native';
import { Text, TextInput, Button, Card, useTheme, Surface, Divider, HelperText, IconButton, ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { spacing } from '../../theme/spacing';
import { useAuth } from '../../context/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import type { CustomTheme } from '../../theme/types';
import Animated, { FadeInUp, FadeInRight, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

type Props = NativeStackScreenProps<MainStackParamList, 'BecomeSeller'>;

type BenefitItem = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
};

const BENEFITS: BenefitItem[] = [
  {
    icon: 'store',
    title: 'Digital Storefront',
    description: 'Create your professional online store with customizable branding and layout'
  },
  {
    icon: 'account-group',
    title: 'Market Access',
    description: 'Connect with a vast network of potential customers across the country'
  },
  {
    icon: 'cash-multiple',
    title: 'Revenue Growth',
    description: 'Maximize your earnings with competitive commission rates and multiple payment options'
  },
  {
    icon: 'shield-lock',
    title: 'Secure Platform',
    description: 'Operate with confidence using our secure and reliable platform'
  }
];

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  color: [string, string];
}

const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: 100000,
    period: 'month',
    features: [
      'Up to 100 product listings',
      'Basic seller dashboard',
      'Email support',
      'Standard payment processing',
      'Basic analytics',
      'Mobile app access'
    ],
    color: ['#2B4162', '#385780']
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 300000,
    period: 'month',
    features: [
      'Unlimited product listings',
      'Advanced seller dashboard',
      'Priority support 24/7',
      'Reduced payment fees',
      'Advanced analytics',
      'API access',
      'Featured products',
      'Custom reports'
    ],
    color: ['#1A237E', '#3949AB']
  }
];

interface StoreInfo {
  storeName: string;
  description: string;
  address: string;
}

export default function BecomeSeller({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const { becomeSeller } = useAuth();
  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    storeName: '',
    description: '',
    phone: '',
    address: '',
    plan: '',
    submit: '',
  });

  const subscriptionPlans: SubscriptionPlan[] = SUBSCRIPTION_PLANS;

  const validateForm = () => {
    const newErrors = {
      storeName: '',
      description: '',
      phone: '',
      address: '',
      plan: '',
      submit: '',
    };
    let isValid = true;

    if (!storeName.trim()) {
      newErrors.storeName = 'Store name is required';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!selectedPlan) {
      newErrors.plan = 'Please select a subscription plan';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setSubmitting(true);
      const storeInfo: StoreInfo = {
        storeName,
        description,
        address,
      };
      await becomeSeller(storeInfo, selectedPlan);
      navigation.goBack();
    } catch (error: any) {
      console.error('Error becoming a seller:', error);
      setErrors({
        ...errors,
        submit: error.message || 'Failed to register as seller. Please try again.',
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
    },
    heroSection: {
      paddingVertical: spacing.xl,
    },
    heroContent: {
      padding: spacing.xl,
      alignItems: 'center',
    },
    heroTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: spacing.md,
      textAlign: 'center',
    },
    heroSubtitle: {
      fontSize: 16,
      opacity: 0.9,
      textAlign: 'center',
      maxWidth: '90%',
    },
    benefitsSection: {
      padding: spacing.xl,
    },
    benefitsTitle: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: spacing.xl,
      textAlign: 'center',
    },
    benefitsGrid: {
      flexDirection: 'column',
    },
    benefitCardSurface: {
      marginBottom: spacing.lg,
      borderRadius: 8,
    },
    benefitCard: {
      padding: spacing.lg,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
    },
    benefitIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: spacing.lg,
    },
    benefitContent: {
      flex: 1,
    },
    benefitTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: spacing.xs,
    },
    benefitDescription: {
      fontSize: 14,
      lineHeight: 20,
    },
    formSection: {
      padding: spacing.xl,
    },
    formTitle: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: spacing.xl,
    },
    input: {
      marginBottom: spacing.md,
    },
    plansSection: {
      padding: spacing.xl,
    },
    plansTitle: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: spacing.xl,
      textAlign: 'center',
    },
    planCard: {
      marginBottom: spacing.lg,
      borderRadius: 8,
      overflow: 'hidden',
    },
    planHeader: {
      padding: spacing.lg,
      alignItems: 'center',
    },
    planName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: spacing.sm,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    currency: {
      fontSize: 20,
      color: 'white',
      marginRight: 4,
    },
    price: {
      fontSize: 32,
      fontWeight: 'bold',
      color: 'white',
    },
    period: {
      fontSize: 16,
      color: 'white',
      marginLeft: 4,
    },
    featuresContainer: {
      padding: spacing.lg,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: spacing.sm,
    },
    featureIcon: {
      marginRight: spacing.sm,
    },
    featureText: {
      fontSize: 15,
    },
    selectButton: {
      marginTop: spacing.lg,
    },
    submitButton: {
      margin: spacing.xl,
    },
    submitButtonContent: {
      height: 48,
    },
    heroGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '100%',
    },
    formSurface: {
      borderRadius: 8,
    },
    formContainer: {
      padding: spacing.xl,
      overflow: 'hidden',
    },
    plansContainer: {
      paddingHorizontal: spacing.md,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    loadingContainer: {
      padding: spacing.xl,
      borderRadius: 12,
      alignItems: 'center',
      minWidth: 200,
    },
    loadingText: {
      marginTop: spacing.md,
    },
  });

  const BenefitCard = ({ item }: { item: BenefitItem }) => {
    return (
      <Surface style={styles.benefitCardSurface} elevation={1}>
        <View style={[styles.benefitCard, { backgroundColor: theme.colors.surface }]}>
          <View style={[styles.benefitIconContainer, { backgroundColor: theme.colors.primaryContainer }]}>
            <MaterialCommunityIcons
              name={item.icon}
              size={24}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.benefitContent}>
            <Text style={[styles.benefitTitle, { color: theme.colors.onSurface }]}>
              {item.title}
            </Text>
            <Text style={[styles.benefitDescription, { color: theme.colors.onSurfaceVariant }]}>
              {item.description}
            </Text>
          </View>
        </View>
      </Surface>
    );
  };

  const SubscriptionCard = ({ plan, isSelected, onSelect }: { 
    plan: SubscriptionPlan;
    isSelected: boolean;
    onSelect: () => void;
  }) => {
    const theme = useTheme<CustomTheme>();

    return (
      <Pressable onPress={onSelect}>
        <Animated.View entering={FadeInUp.delay(200)}>
          <Surface 
            style={[
              styles.planCard,
              {
                backgroundColor: theme.colors.surface,
                borderColor: isSelected ? theme.colors.primary : theme.colors.outline,
                borderWidth: isSelected ? 2 : 1
              }
            ]} 
            elevation={isSelected ? 4 : 2}
          >
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.planHeader}
            >
              <Text style={[styles.planName, { color: theme.colors.onPrimary }]}>
                {plan.name}
              </Text>
              <View style={styles.priceContainer}>
                <Text style={[styles.currency, { color: theme.colors.onPrimary }]}>₦</Text>
                <Text style={[styles.price, { color: theme.colors.onPrimary }]}>
                  {(plan.price / 100).toLocaleString()}
                </Text>
                <Text style={[styles.period, { color: theme.colors.onPrimary }]}>
                  /{plan.period}
                </Text>
              </View>
            </LinearGradient>
            <View style={[styles.featuresContainer, { backgroundColor: theme.colors.surface }]}>
              {plan.features.map((feature, index) => (
                <View key={index} style={styles.featureRow}>
                  <IconButton
                    icon="check-circle"
                    size={20}
                    iconColor={theme.colors.primary}
                    style={styles.featureIcon}
                  />
                  <Text style={[styles.featureText, { color: theme.colors.onSurface }]}>
                    {feature}
                  </Text>
                </View>
              ))}
              <Button
                mode={isSelected ? "contained" : "outlined"}
                onPress={onSelect}
                style={styles.selectButton}
                contentStyle={{ height: 45 }}
                labelStyle={{ fontSize: 16, fontWeight: '600' }}
              >
                {isSelected ? 'Selected Plan' : 'Select Plan'}
              </Button>
            </View>
          </Surface>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      {submitting && (
        <View style={styles.loadingOverlay}>
          <Surface style={[styles.loadingContainer, { backgroundColor: theme.colors.surface }]}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={[
              styles.loadingText,
              theme.typography.bodyLarge,
              { color: theme.colors.onSurface }
            ]}>
              Registering your store...
            </Text>
          </Surface>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.heroSection, { backgroundColor: theme.colors.primary }]}>
          <LinearGradient
            colors={[theme.colors.primary, `${theme.colors.primary}80`]}
            style={styles.heroGradient}
          />
          <Animated.View 
            entering={FadeInUp.duration(1000)} 
            style={styles.heroContent}
          >
            <Text style={[styles.heroTitle, { color: theme.colors.onPrimary }]}>
              Become a Seller
            </Text>
            <Text style={[styles.heroSubtitle, { color: theme.colors.onPrimary }]}>
              Join our marketplace and start growing your business today
            </Text>
          </Animated.View>
        </View>

        <View style={[styles.benefitsSection, { backgroundColor: theme.colors.background }]}>
          <Animated.Text 
            entering={FadeInUp.delay(100)} 
            style={[styles.benefitsTitle, { color: theme.colors.onBackground }]}
          >
            Why Sell With Us?
          </Animated.Text>
          <View style={styles.benefitsGrid}>
            {BENEFITS.map((benefit, index) => (
              <BenefitCard key={benefit.title} item={benefit} />
            ))}
          </View>
        </View>

        <View style={[styles.formSection, { backgroundColor: theme.colors.background }]}>
          <Surface style={[styles.formSurface]} elevation={2}>
            <View style={[styles.formContainer, { backgroundColor: theme.colors.surface }]}>
              <Text style={[styles.formTitle, { color: theme.colors.onSurface }]}>
                Store Information
              </Text>
              <TextInput
                label="Store Name"
                value={storeName}
                onChangeText={(text) => {
                  setStoreName(text);
                  setErrors({ ...errors, storeName: '', submit: '' });
                }}
                mode="outlined"
                error={!!errors.storeName}
                style={[styles.input, { backgroundColor: theme.colors.surface }]}
                theme={{ roundness: 8, colors: { 
                  primary: theme.colors.primary,
                  error: theme.colors.error,
                  placeholder: theme.colors.onSurfaceVariant,
                  text: theme.colors.onSurface,
                }}}
              />
              {errors.storeName ? (
                <HelperText type="error" visible={!!errors.storeName}>
                  {errors.storeName}
                </HelperText>
              ) : null}

              <TextInput
                label="Store Description"
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                  setErrors({ ...errors, description: '', submit: '' });
                }}
                mode="outlined"
                error={!!errors.description}
                style={[styles.input, { backgroundColor: theme.colors.surface }]}
                multiline
                numberOfLines={4}
                theme={{ roundness: 8, colors: { 
                  primary: theme.colors.primary,
                  error: theme.colors.error,
                  placeholder: theme.colors.onSurfaceVariant,
                  text: theme.colors.onSurface,
                }}}
              />
              {errors.description ? (
                <HelperText type="error" visible={!!errors.description}>
                  {errors.description}
                </HelperText>
              ) : null}

              <TextInput
                label="Phone Number"
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  setErrors({ ...errors, phone: '', submit: '' });
                }}
                mode="outlined"
                error={!!errors.phone}
                style={[styles.input, { backgroundColor: theme.colors.surface }]}
                keyboardType="phone-pad"
                theme={{ roundness: 8, colors: { 
                  primary: theme.colors.primary,
                  error: theme.colors.error,
                  placeholder: theme.colors.onSurfaceVariant,
                  text: theme.colors.onSurface,
                }}}
              />
              {errors.phone ? (
                <HelperText type="error" visible={!!errors.phone}>
                  {errors.phone}
                </HelperText>
              ) : null}

              <TextInput
                label="Store Address"
                value={address}
                onChangeText={(text) => {
                  setAddress(text);
                  setErrors({ ...errors, address: '', submit: '' });
                }}
                mode="outlined"
                error={!!errors.address}
                style={[styles.input, { backgroundColor: theme.colors.surface }]}
                theme={{ roundness: 8, colors: { 
                  primary: theme.colors.primary,
                  error: theme.colors.error,
                  placeholder: theme.colors.onSurfaceVariant,
                  text: theme.colors.onSurface,
                }}}
              />
              {errors.address ? (
                <HelperText type="error" visible={!!errors.address}>
                  {errors.address}
                </HelperText>
              ) : null}
            </View>
          </Surface>
        </View>

        <View style={[styles.plansSection, { backgroundColor: theme.colors.background }]}>
          <Animated.Text 
            entering={FadeInUp.delay(150)} 
            style={[styles.plansTitle, { color: theme.colors.onBackground }]}
          >
            Choose Your Plan
          </Animated.Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.plansContainer}
            snapToInterval={CARD_WIDTH + spacing.md}
            decelerationRate="fast"
          >
            {subscriptionPlans.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlan === plan.id}
                onSelect={() => {
                  setSelectedPlan(plan.id);
                  setErrors({ ...errors, plan: '' });
                }}
              />
            ))}
          </ScrollView>
          {errors.plan ? (
            <HelperText type="error" style={{ textAlign: 'center', marginTop: spacing.sm }}>
              {errors.plan}
            </HelperText>
          ) : null}
        </View>

        {errors.submit && (
          <HelperText 
            type="error" 
            style={{ 
              textAlign: 'center', 
              marginHorizontal: spacing.xl,
              marginTop: -spacing.lg,
            }}
          >
            {errors.submit}
          </HelperText>
        )}
        
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading || submitting}
          style={[styles.submitButton, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.submitButtonContent}
          labelStyle={{ fontSize: 16, fontWeight: '600', color: theme.colors.onPrimary }}
        >
          {loading ? 'Registering...' : 'Register as Seller'}
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
} 