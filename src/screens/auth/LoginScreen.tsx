import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText, IconButton, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { useAuth } from '../../context/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import type { CustomTheme } from '../../theme/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const { login, continueAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      setLoading(true);
      await continueAsGuest();
    } catch (err) {
      console.error('Failed to continue as guest:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (platform: string) => {
    // TODO: Implement social login
    console.log(`Login with ${platform}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.guestButtonContainer}>
        <Button
          mode="text"
          onPress={handleGuestLogin}
          disabled={loading}
          labelStyle={{ color: theme.colors.primary }}
        >
          Continue as Guest
        </Button>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.primaryContainer]}
              style={styles.logoContainer}
            >
              <Ionicons name="cart" size={60} color={theme.colors.onPrimary} />
            </LinearGradient>
            <Text style={[typography.titleLarge, styles.title, { color: theme.colors.onBackground }]}>
              Welcome Back!
            </Text>
            <Text style={[typography.bodyLarge, styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Sign in to continue shopping
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError('');
              }}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="email" />}
              style={styles.input}
              error={!!error}
              disabled={loading}
              theme={theme}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError('');
              }}
              mode="outlined"
              secureTextEntry={secureTextEntry}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye' : 'eye-off'}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              }
              style={styles.input}
              error={!!error}
              disabled={loading}
              theme={theme}
            />

            {error ? (
              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>
            ) : null}

            <Button
              mode="text"
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPassword}
              labelStyle={{ color: theme.colors.primary }}
            >
              Forgot Password?
            </Button>

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              contentStyle={styles.buttonContent}
              loading={loading}
              disabled={loading}
            >
              Sign In
            </Button>

            <View style={styles.divider}>
              <View style={[styles.dividerLine, { backgroundColor: theme.colors.outline }]} />
              <Text style={[styles.dividerText, { color: theme.colors.onSurfaceVariant }]}>OR</Text>
              <View style={[styles.dividerLine, { backgroundColor: theme.colors.outline }]} />
            </View>

            <View style={styles.socialButtons}>
              <IconButton
                icon="google"
                size={24}
                mode="contained"
                containerColor={theme.colors.surfaceVariant}
                iconColor={theme.colors.error}
                onPress={() => handleSocialLogin('Google')}
                style={styles.socialButton}
              />
              <IconButton
                icon="apple"
                size={24}
                mode="contained"
                containerColor={theme.colors.surfaceVariant}
                iconColor={theme.colors.onSurface}
                onPress={() => handleSocialLogin('Apple')}
                style={styles.socialButton}
              />
              <IconButton
                icon="facebook"
                size={24}
                mode="contained"
                containerColor={theme.colors.surfaceVariant}
                iconColor="#1877F2"
                onPress={() => handleSocialLogin('Facebook')}
                style={styles.socialButton}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={[typography.bodyLarge, styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
              Don't have an account?
            </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Signup')}
              labelStyle={{ color: theme.colors.primary }}
            >
              Sign Up
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  guestButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? spacing.xl * 2 : spacing.xl,
    right: spacing.md,
    zIndex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.xl * 2,
    paddingBottom: spacing.xl,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  form: {
    padding: spacing.lg,
  },
  input: {
    marginBottom: spacing.md,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
  },
  loginButton: {
    marginBottom: spacing.xl,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  socialButton: {
    margin: 0,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  footerText: {
    marginRight: spacing.xs,
  },
}); 