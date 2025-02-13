import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { MainNavigator } from './src/navigation/MainNavigator';
import { useFonts } from './src/hooks/useFonts';
import { Loading } from './src/components/common/Loading';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { createNavigationTheme } from './src/theme/navigationTheme';

const AppContent = () => {
  const { user } = useAuth();
  const { theme, isDarkMode } = useTheme();
  const fontsLoaded = useFonts();
  const navigationTheme = createNavigationTheme(theme);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        {user ? <MainNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
