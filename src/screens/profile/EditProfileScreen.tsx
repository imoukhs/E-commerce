import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { Text, TextInput, Button, useTheme, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import { useAuth } from '../../context/AuthContext';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';
import type { CustomTheme } from '../../theme/types';

type Props = NativeStackScreenProps<MainStackParamList, 'EditProfile'>;

export default function EditProfileScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    bio: '',
  });

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

  const handleSave = async () => {
    try {
      setLoading(true);
      // TODO: Implement profile update logic
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.photoSection} elevation={1}>
          <Pressable onPress={pickImage}>
            <View style={styles.avatarContainer}>
              <Image
                source={user?.photoURL ? { uri: user.photoURL } : require('../../../assets/defaultAvatar.png')}
                style={styles.avatar}
              />
              <View style={[styles.editBadge, { backgroundColor: theme.colors.primary }]}>
                <MaterialCommunityIcons name="camera" size={16} color={theme.colors.onPrimary} />
              </View>
            </View>
          </Pressable>
          <Text style={[theme.typography.bodySmall, styles.photoHint]}>
            Tap to change profile photo
          </Text>
        </Surface>

        <Surface style={styles.formSection} elevation={1}>
          <View style={styles.inputContainer}>
            <Text style={[theme.typography.labelMedium, styles.inputLabel]}>Full Name</Text>
            <TextInput
              mode="outlined"
              value={formData.displayName}
              onChangeText={(text) => setFormData({ ...formData, displayName: text })}
              style={styles.input}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[theme.typography.labelMedium, styles.inputLabel]}>Email</Text>
            <TextInput
              mode="outlined"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[theme.typography.labelMedium, styles.inputLabel]}>Phone Number</Text>
            <TextInput
              mode="outlined"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={[theme.typography.labelMedium, styles.inputLabel]}>Bio</Text>
            <TextInput
              mode="outlined"
              value={formData.bio}
              onChangeText={(text) => setFormData({ ...formData, bio: text })}
              style={styles.input}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={4}
            />
          </View>
        </Surface>

        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={styles.saveButton}
          >
            Save Changes
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
  scrollContent: {
    padding: spacing.md,
  },
  photoSection: {
    padding: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoHint: {
    opacity: 0.7,
  },
  formSection: {
    padding: spacing.lg,
    borderRadius: 16,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    marginTop: spacing.lg,
  },
  saveButton: {
    borderRadius: 8,
    paddingVertical: spacing.xs,
  },
}); 