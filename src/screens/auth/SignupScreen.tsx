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

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

export default function SignupScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [secureTextEntry, setSecureTextEntry] = useState({
    password: true,
    confirmPassword: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');
      await signup(formData.fullName, formData.email, formData.password);
    } catch (err) {
      setError('Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (platform: string) => {
    // TODO: Implement social signup
    console.log(`Signup with ${platform}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
              <Ionicons name="person-add" size={60} color={theme.colors.onPrimary} />
            </LinearGradient>
            <Text style={[typography.titleLarge, styles.title, { color: theme.colors.onBackground }]}>
              Create Account
            </Text>
            <Text style={[typography.bodyLarge, styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Join our community and start shopping
            </Text>
          </View>

          <View style={styles.form}>
            <TextInput
              label="Full Name"
              value={formData.fullName}
              onChangeText={(text) => {
                setFormData({ ...formData, fullName: text });
                setError('');
              }}
              mode="outlined"
              left={<TextInput.Icon icon="account" />}
              style={styles.input}
              error={!!error}
              disabled={loading}
              theme={theme}
            />

            <TextInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => {
                setFormData({ ...formData, email: text });
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
              value={formData.password}
              onChangeText={(text) => {
                setFormData({ ...formData, password: text });
                setError('');
              }}
              mode="outlined"
              secureTextEntry={secureTextEntry.password}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={secureTextEntry.password ? 'eye' : 'eye-off'}
                  onPress={() =>
                    setSecureTextEntry({
                      ...secureTextEntry,
                      password: !secureTextEntry.password,
                    })
                  }
                />
              }
              style={styles.input}
              error={!!error}
              disabled={loading}
              theme={theme}
            />

            <TextInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => {
                setFormData({ ...formData, confirmPassword: text });
                setError('');
              }}
              mode="outlined"
              secureTextEntry={secureTextEntry.confirmPassword}
              left={<TextInput.Icon icon="lock-check" />}
              right={
                <TextInput.Icon
                  icon={secureTextEntry.confirmPassword ? 'eye' : 'eye-off'}
                  onPress={() =>
                    setSecureTextEntry({
                      ...secureTextEntry,
                      confirmPassword: !secureTextEntry.confirmPassword,
                    })
                  }
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
              mode="contained"
              onPress={handleSignup}
              style={styles.signupButton}
              contentStyle={styles.buttonContent}
              loading={loading}
              disabled={loading}
            >
              Sign Up
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
                onPress={() => handleSocialSignup('Google')}
                style={styles.socialButton}
              />
              <IconButton
                icon="apple"
                size={24}
                mode="contained"
                containerColor={theme.colors.surfaceVariant}
                iconColor={theme.colors.onSurface}
                onPress={() => handleSocialSignup('Apple')}
                style={styles.socialButton}
              />
              <IconButton
                icon="facebook"
                size={24}
                mode="contained"
                containerColor={theme.colors.surfaceVariant}
                iconColor="#1877F2"
                onPress={() => handleSocialSignup('Facebook')}
                style={styles.socialButton}
              />
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={[typography.bodyLarge, styles.footerText, { color: theme.colors.onSurfaceVariant }]}>
              Already have an account?
            </Text>
            <Button
              mode="text"
              onPress={() => navigation.navigate('Login')}
              labelStyle={{ color: theme.colors.primary }}
            >
              Sign In
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
  signupButton: {
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