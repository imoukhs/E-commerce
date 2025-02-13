import type { NavigatorScreenParams } from '@react-navigation/native';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainStackParamList>;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  Profile: undefined;
  ProductDetail: {
    product: {
      id: string;
      name: string;
      description: string;
      price: number;
      image: string;
      category: string;
    };
  };
  Cart: undefined;
  Checkout: undefined;
  OrderConfirmation: {
    orderId: string;
  };
  OrderHistory: undefined;
  OrderDetail: { orderId: string };
  Settings: undefined;
  EditProfile: undefined;
  Language: undefined;
  Notifications: undefined;
  PrivacySecurity: undefined;
  HelpCenter: undefined;
  About: undefined;
  Search: undefined;
  ShippingAddresses: undefined;
  PaymentMethods: undefined;
  Reviews: undefined;
  ContactUs: undefined;
  // Seller related screens
  BecomeSeller: undefined;
  SellerDashboard: undefined;
  SellerProducts: undefined;
  SellerAnalytics: undefined;
  // Product Management
  ProductManagement: undefined;
  AddProduct: undefined;
  EditProduct: {
    productId: string;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Categories: undefined;
  Cart: undefined;
  Profile: undefined;
  Favorites: undefined;
}; 