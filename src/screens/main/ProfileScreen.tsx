import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Text, Surface, Button, List, useTheme, IconButton, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { spacing } from '../../theme/spacing';
import { useAuth } from '../../context/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import type { CustomTheme } from '../../theme/types';

type Props = NativeStackScreenProps<MainStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const { user, logout } = useAuth();
  const [isSeller, setIsSeller] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      // TODO: Implement profile picture update
      console.log('Selected image:', result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView>
        <Surface style={styles.headerSurface} elevation={1}>
          <View style={styles.headerInner}>
            <View style={styles.headerContent}>
              <Pressable onPress={pickImage}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={user?.photoURL ? { uri: user.photoURL } : require('../../../assets/defaultAvatar.png')}
                    style={styles.avatar}
                  />
                  <View style={[styles.editBadge, { backgroundColor: theme.colors.primary }]}>
                    <MaterialCommunityIcons name="camera" size={12} color={theme.colors.onPrimary} />
                  </View>
                </View>
              </Pressable>
              <Text style={[theme.typography.titleLarge, styles.name]}>
                {user?.displayName || 'User Name'}
              </Text>
              <Text style={[theme.typography.bodyMedium, styles.email]}>
                {user?.email || 'email@example.com'}
              </Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={[theme.typography.titleLarge, styles.statValue]}>12</Text>
                  <Text style={[theme.typography.bodySmall, styles.statLabel]}>Orders</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[theme.typography.titleLarge, styles.statValue]}>3</Text>
                  <Text style={[theme.typography.bodySmall, styles.statLabel]}>Reviews</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={[theme.typography.titleLarge, styles.statValue]}>5</Text>
                  <Text style={[theme.typography.bodySmall, styles.statLabel]}>Wishlist</Text>
                </View>
              </View>
            </View>
          </View>
        </Surface>

        <Surface style={[styles.sectionSurface, { marginTop: spacing.md }]} elevation={1}>
          <List.Section>
            <List.Subheader>Account Settings</List.Subheader>
            <List.Item
              title="Edit Profile"
              left={props => <List.Icon {...props} icon="account-edit" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('EditProfile')}
            />
            <List.Item
              title="Shipping Addresses"
              left={props => <List.Icon {...props} icon="map-marker" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('ShippingAddresses')}
            />
            <List.Item
              title="Payment Methods"
              left={props => <List.Icon {...props} icon="credit-card" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('PaymentMethods')}
            />
          </List.Section>
        </Surface>

        <Surface style={[styles.sectionSurface, { marginTop: spacing.md }]} elevation={1}>
          <List.Section>
            <List.Subheader>Seller Account</List.Subheader>
            {isSeller ? (
              <>
                <List.Item
                  title="Seller Dashboard"
                  description="Manage your store and products"
                  left={props => <List.Icon {...props} icon="store" />}
                  right={props => <List.Icon {...props} icon="chevron-right" />}
                  onPress={() => navigation.navigate('SellerDashboard')}
                />
                <List.Item
                  title="My Products"
                  description="View and manage your listings"
                  left={props => <List.Icon {...props} icon="package-variant" />}
                  right={props => <List.Icon {...props} icon="chevron-right" />}
                  onPress={() => navigation.navigate('SellerProducts')}
                />
                <List.Item
                  title="Sales Analytics"
                  description="View your sales performance"
                  left={props => <List.Icon {...props} icon="chart-line" />}
                  right={props => <List.Icon {...props} icon="chevron-right" />}
                  onPress={() => navigation.navigate('SellerAnalytics')}
                />
              </>
            ) : (
              <View style={styles.becomeSellerContainer}>
                <Text style={[theme.typography.bodyMedium, styles.becomeSellerText]}>
                  Start selling your products on our marketplace
                </Text>
                <Button
                  mode="contained"
                  icon="store-plus"
                  onPress={() => navigation.navigate('BecomeSeller')}
                  style={styles.becomeSellerButton}
                >
                  Become a Vendor
                </Button>
              </View>
            )}
          </List.Section>
        </Surface>

        <Surface style={[styles.sectionSurface, { marginTop: spacing.md }]} elevation={1}>
          <List.Section>
            <List.Subheader>Shopping</List.Subheader>
            <List.Item
              title="Order History"
              left={props => <List.Icon {...props} icon="history" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('OrderHistory')}
            />
            <List.Item
              title="My Reviews"
              left={props => <List.Icon {...props} icon="star" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('Reviews')}
            />
            <List.Item
              title="Wishlist"
              left={props => <List.Icon {...props} icon="heart" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => {}}
            />
          </List.Section>
        </Surface>

        <Surface style={[styles.sectionSurface, { marginTop: spacing.md }]} elevation={1}>
          <List.Section>
            <List.Subheader>Preferences</List.Subheader>
            <List.Item
              title="Settings"
              left={props => <List.Icon {...props} icon="cog" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('Settings')}
            />
            <List.Item
              title="Help Center"
              left={props => <List.Icon {...props} icon="help-circle" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('HelpCenter')}
            />
            <List.Item
              title="About"
              left={props => <List.Icon {...props} icon="information" />}
              right={props => <List.Icon {...props} icon="chevron-right" />}
              onPress={() => navigation.navigate('About')}
            />
          </List.Section>
        </Surface>

        <View style={styles.logoutContainer}>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            icon="logout"
          >
            Log Out
          </Button>
        </View>
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
  headerInner: {
    borderRadius: 16,
  },
  headerContent: {
    padding: spacing.lg,
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginBottom: spacing.xs,
  },
  email: {
    marginBottom: spacing.md,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statLabel: {
    opacity: 0.7,
  },
  statDivider: {
    width: 1,
    height: '100%',
    opacity: 0.2,
    backgroundColor: 'gray',
  },
  sectionSurface: {
    marginHorizontal: spacing.md,
    borderRadius: 16,
    overflow: 'hidden',
  },
  logoutContainer: {
    padding: spacing.lg,
  },
  logoutButton: {
    borderRadius: 8,
  },
  becomeSellerContainer: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  becomeSellerText: {
    textAlign: 'center',
    marginBottom: spacing.md,
    opacity: 0.7,
  },
  becomeSellerButton: {
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
  },
}); 