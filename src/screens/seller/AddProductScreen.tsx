import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, TextInput, Button, useTheme, Surface, HelperText, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'AddProduct'>;

export default function AddProductScreen({ navigation }: Props) {
  const theme = useTheme<CustomTheme>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
  });
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    images: '',
    submit: '',
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImages([...images, result.assets[0].uri]);
      setErrors({ ...errors, images: '' });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      images: '',
      submit: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = 'Price must be a number';
      isValid = false;
    }

    if (!formData.stock.trim()) {
      newErrors.stock = 'Stock quantity is required';
      isValid = false;
    } else if (isNaN(Number(formData.stock))) {
      newErrors.stock = 'Stock must be a number';
      isValid = false;
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
      isValid = false;
    }

    if (images.length === 0) {
      newErrors.images = 'At least one image is required';
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
      // TODO: Implement API call to create product
      navigation.goBack();
    } catch (error: any) {
      setErrors({
        ...errors,
        submit: error.message || 'Failed to create product. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Surface style={styles.formSurface} elevation={1}>
          <View style={styles.formContainer}>
            <Text style={[theme.typography.titleLarge, styles.title]}>
              Add New Product
            </Text>

            <View style={styles.imageSection}>
              <Text style={[theme.typography.titleMedium, styles.sectionTitle]}>
                Product Images
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {images.map((uri, index) => (
                  <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri }} style={styles.image} />
                    <IconButton
                      icon="close"
                      size={20}
                      style={styles.removeImage}
                      onPress={() => removeImage(index)}
                    />
                  </View>
                ))}
                <Button
                  mode="outlined"
                  onPress={pickImage}
                  style={styles.addImageButton}
                  icon="camera"
                >
                  Add Image
                </Button>
              </ScrollView>
              {errors.images ? (
                <HelperText type="error" visible={!!errors.images}>
                  {errors.images}
                </HelperText>
              ) : null}
            </View>

            <TextInput
              label="Product Name"
              value={formData.name}
              onChangeText={(text) => {
                setFormData({ ...formData, name: text });
                setErrors({ ...errors, name: '' });
              }}
              mode="outlined"
              error={!!errors.name}
              style={styles.input}
            />
            {errors.name ? (
              <HelperText type="error" visible={!!errors.name}>
                {errors.name}
              </HelperText>
            ) : null}

            <TextInput
              label="Description"
              value={formData.description}
              onChangeText={(text) => {
                setFormData({ ...formData, description: text });
                setErrors({ ...errors, description: '' });
              }}
              mode="outlined"
              error={!!errors.description}
              style={styles.input}
              multiline
              numberOfLines={4}
            />
            {errors.description ? (
              <HelperText type="error" visible={!!errors.description}>
                {errors.description}
              </HelperText>
            ) : null}

            <TextInput
              label="Price (₦)"
              value={formData.price}
              onChangeText={(text) => {
                setFormData({ ...formData, price: text });
                setErrors({ ...errors, price: '' });
              }}
              mode="outlined"
              error={!!errors.price}
              style={styles.input}
              keyboardType="numeric"
            />
            {errors.price ? (
              <HelperText type="error" visible={!!errors.price}>
                {errors.price}
              </HelperText>
            ) : null}

            <TextInput
              label="Stock Quantity"
              value={formData.stock}
              onChangeText={(text) => {
                setFormData({ ...formData, stock: text });
                setErrors({ ...errors, stock: '' });
              }}
              mode="outlined"
              error={!!errors.stock}
              style={styles.input}
              keyboardType="numeric"
            />
            {errors.stock ? (
              <HelperText type="error" visible={!!errors.stock}>
                {errors.stock}
              </HelperText>
            ) : null}

            <TextInput
              label="Category"
              value={formData.category}
              onChangeText={(text) => {
                setFormData({ ...formData, category: text });
                setErrors({ ...errors, category: '' });
              }}
              mode="outlined"
              error={!!errors.category}
              style={styles.input}
            />
            {errors.category ? (
              <HelperText type="error" visible={!!errors.category}>
                {errors.category}
              </HelperText>
            ) : null}

            {errors.submit ? (
              <HelperText type="error" style={styles.submitError}>
                {errors.submit}
              </HelperText>
            ) : null}

            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={loading}
              disabled={loading}
              style={styles.submitButton}
              contentStyle={styles.submitButtonContent}
            >
              Create Product
            </Button>
          </View>
        </Surface>
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
  formSurface: {
    borderRadius: 12,
  },
  formContainer: {
    padding: spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
  },
  title: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  imageSection: {
    marginBottom: spacing.lg,
  },
  imageContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeImage: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
  },
  addImageButton: {
    height: 100,
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  input: {
    marginBottom: spacing.sm,
  },
  submitError: {
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  submitButton: {
    marginTop: spacing.lg,
  },
  submitButtonContent: {
    height: 48,
  },
}); 