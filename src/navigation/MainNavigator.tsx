import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import HomeScreen from '../screens/main/HomeScreen';
import SearchScreen from '../screens/main/SearchScreen';
import CategoryScreen from '../screens/main/CategoryScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProductDetailScreen from '../screens/product/ProductDetailScreen';
import CheckoutScreen from '../screens/cart/CheckoutScreen';
import OrderConfirmationScreen from '../screens/cart/OrderConfirmationScreen';
import { CustomTabBar } from '../components/navigation/CustomTabBar';
import OrderHistoryScreen from '../screens/main/OrderHistoryScreen';
import { MainTabNavigator } from './MainTabNavigator';
import EditProfileScreen from '../screens/main/EditProfileScreen';
import ShippingAddressesScreen from '../screens/main/ShippingAddressesScreen';
import PaymentMethodsScreen from '../screens/main/PaymentMethodsScreen';
import ReviewsScreen from '../screens/main/ReviewsScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import PrivacySecurityScreen from '../screens/main/PrivacySecurityScreen';
import LanguageScreen from '../screens/main/LanguageScreen';
import HelpCenterScreen from '../screens/main/HelpCenterScreen';
import ContactUsScreen from '../screens/main/ContactUsScreen';
import AboutScreen from '../screens/main/AboutScreen';
import BecomeSeller from '../screens/seller/BecomeSeller';
import ProductManagementScreen from '../screens/seller/ProductManagementScreen';
import AddProductScreen from '../screens/seller/AddProductScreen';
import type { MainStackParamList, MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator<MainStackParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Categories" component={CategoryScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ShippingAddresses" component={ShippingAddressesScreen} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} />
      <Stack.Screen name="Reviews" component={ReviewsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="BecomeSeller" component={BecomeSeller} />
      <Stack.Screen name="ProductManagement" component={ProductManagementScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
    </Stack.Navigator>
  );
} 