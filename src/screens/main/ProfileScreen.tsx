import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { Text, Surface, Button, List, Switch, useTheme, Divider, Badge } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import { useAuth } from '../../context/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList } from '../../navigation/types';
import { useTheme as useAppTheme } from '../../context/ThemeContext';

type Props = NativeStackScreenProps<MainTabParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useAppTheme();
  const [isSeller, setIsSeller] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigateToScreen = (screenName: keyof MainTabParamList) => {
    navigation.getParent()?.navigate(screenName);
  };

  const handleBecomeSeller = () => {
    // TODO: Implement seller onboarding flow
    setIsSeller(true);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Surface style={styles.headerSurface} elevation={1}>
          <View style={styles.headerContentWrapper}>
            <View style={styles.headerContent}>
              <View style={styles.profileInfo}>
                <Pressable onPress={() => navigation.getParent()?.navigate('EditProfile')}>
                  <View style={styles.avatarContainer}>
                    <Image
                      source={user?.photoURL ? { uri: user.photoURL } : require('../../../assets/defaultAvatar.png')}
                      style={styles.avatar}
                    />
                    <View style={[styles.editBadge, { backgroundColor: theme.colors.primary }]}>
                      <MaterialCommunityIcons name="pencil" size={12} color={theme.colors.onPrimary} />
                    </View>
                  </View>
                </Pressable>
                <View style={styles.userInfo}>
                  <Text style={[theme.typography.titleLarge, { color: theme.colors.onSurface }]}>
                    {user?.displayName || user?.name || 'User'}
                  </Text>
                  <Text style={[theme.typography.bodyMedium, { color: theme.colors.onSurfaceVariant }]}>
                    {user?.email}
                  </Text>
                  {isSeller && (
                    <Badge style={[styles.sellerBadge, { backgroundColor: theme.colors.primary }]}>
                      Seller
                    </Badge>
                  )}
                </View>
              </View>
            </View>
          </View>
        </Surface>

        {!isSeller && (
          <Surface style={styles.section} elevation={1}>
            <View style={styles.sectionWrapper}>
              <View style={styles.sectionContent}>
                <List.Item
                  title="Become a Seller"
                  description="Start selling your products on our platform"
                  left={props => <List.Icon {...props} icon="store" color={theme.colors.primary} />}
                  right={props => <List.Icon {...props} icon="chevron-right" />}
                  onPress={handleBecomeSeller}
                />
              </View>
            </View>
          </Surface>
        )}

        <Surface style={styles.section} elevation={1}>
          <View style={styles.sectionContent}>
            <List.Item
              title="My Orders"
              left={props => <List.Icon {...props} icon="package-variant" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.getParent()?.navigate('OrderHistory')}
            />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <List.Item
              title="Shipping Addresses"
              left={props => <List.Icon {...props} icon="map-marker" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.getParent()?.navigate('ShippingAddresses')}
            />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <List.Item
              title="Payment Methods"
              left={props => <List.Icon {...props} icon="credit-card" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.getParent()?.navigate('PaymentMethods')}
            />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <List.Item
              title="My Reviews"
              left={props => <List.Icon {...props} icon="star" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.getParent()?.navigate('Reviews')}
            />
          </View>
        </Surface>

        {isSeller && (
          <Surface style={styles.section} elevation={1}>
            <View style={styles.sectionContent}>
              <List.Item
                title="My Store"
                left={props => <List.Icon {...props} icon="store" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {/* TODO: Navigate to seller dashboard */}}
              />
              <Divider style={{ backgroundColor: theme.colors.outline }} />
              <List.Item
                title="Products"
                left={props => <List.Icon {...props} icon="package" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {/* TODO: Navigate to seller products */}}
              />
              <Divider style={{ backgroundColor: theme.colors.outline }} />
              <List.Item
                title="Orders"
                left={props => <List.Icon {...props} icon="receipt" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {/* TODO: Navigate to seller orders */}}
              />
              <Divider style={{ backgroundColor: theme.colors.outline }} />
              <List.Item
                title="Analytics"
                left={props => <List.Icon {...props} icon="chart-bar" />}
                right={props => <List.Icon {...props} icon="chevron-right" />}
                onPress={() => {/* TODO: Navigate to seller analytics */}}
              />
            </View>
          </Surface>
        )}

        <Surface style={styles.section} elevation={1}>
          <View style={styles.sectionContent}>
            <List.Item
              title="Dark Mode"
              left={props => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => <Switch value={isDarkMode} onValueChange={toggleTheme} />}
            />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <List.Item
              title="Language"
              left={props => <List.Icon {...props} icon="translate" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.getParent()?.navigate('Language')}
            />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <List.Item
              title="Notifications"
              left={props => <List.Icon {...props} icon="bell-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.getParent()?.navigate('Notifications')}
            />
          </View>
        </Surface>

        <Surface style={styles.section} elevation={1}>
          <View style={styles.sectionContent}>
            <List.Item
              title="Privacy & Security"
              left={props => <List.Icon {...props} icon="shield-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.getParent()?.navigate('PrivacySecurity')}
            />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <List.Item
              title="Help Center"
              left={props => <List.Icon {...props} icon="help-circle-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.getParent()?.navigate('HelpCenter')}
            />
            <Divider style={{ backgroundColor: theme.colors.outline }} />
            <List.Item
              title="About"
              left={props => <List.Icon {...props} icon="information-outline" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.getParent()?.navigate('About')}
            />
          </View>
        </Surface>

        <Button
          mode="contained"
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: theme.colors.error }]}
          contentStyle={styles.buttonContent}
          labelStyle={{ color: theme.colors.onError }}
          icon="logout"
        >
          Logout
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSurface: {
    margin: spacing.md,
    borderRadius: 16,
  },
  headerContentWrapper: {
    borderRadius: 16,
  },
  headerContent: {
    padding: spacing.lg,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  sellerBadge: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
  },
  section: {
    margin: spacing.md,
    borderRadius: 16,
  },
  sectionWrapper: {
    borderRadius: 16,
  },
  sectionContent: {
    borderRadius: 16,
  },
  logoutButton: {
    margin: spacing.md,
    marginTop: spacing.lg,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
}); 