import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface, IconButton, useTheme as usePaperTheme, FAB, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'ShippingAddresses'>;

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
  phone: string;
}

const MOCK_ADDRESSES: Address[] = [
  {
    id: '1',
    name: 'Home',
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    isDefault: true,
    phone: '+1 (123) 456-7890',
  },
  {
    id: '2',
    name: 'Office',
    street: '456 Business Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    country: 'United States',
    isDefault: false,
    phone: '+1 (987) 654-3210',
  },
];

export default function ShippingAddressesScreen({ navigation }: Props) {
  const theme = usePaperTheme<CustomTheme>();
  const [addresses, setAddresses] = useState<Address[]>(MOCK_ADDRESSES);

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === id,
    })));
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(address => address.id !== id));
  };

  const handleEdit = (address: Address) => {
    // TODO: Navigate to edit address screen
  };

  const handleAdd = () => {
    // TODO: Navigate to add address screen
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {addresses.map((address) => (
            <Surface key={address.id} style={styles.card}>
              <View>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitle}>
                    <MaterialCommunityIcons
                      name={address.isDefault ? 'home' : 'office-building'}
                      size={24}
                      color={theme.colors.primary}
                    />
                    <Text style={[theme.typography.titleMedium, styles.addressName]}>
                      {address.name}
                    </Text>
                    {address.isDefault && (
                      <Surface style={styles.defaultBadge}>
                        <View>
                          <Text style={[theme.typography.labelSmall, styles.defaultText]}>
                            Default
                          </Text>
                        </View>
                      </Surface>
                    )}
                  </View>
                  <View style={styles.cardActions}>
                    <IconButton
                      icon="pencil"
                      size={20}
                      onPress={() => handleEdit(address)}
                    />
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => handleDelete(address.id)}
                    />
                  </View>
                </View>
                <View style={styles.addressDetails}>
                  <Text style={theme.typography.bodyLarge}>
                    {address.street}
                  </Text>
                  <Text style={theme.typography.bodyMedium}>
                    {`${address.city}, ${address.state} ${address.zipCode}`}
                  </Text>
                  <Text style={theme.typography.bodyMedium}>
                    {address.country}
                  </Text>
                  <Text style={theme.typography.bodyMedium}>
                    {address.phone}
                  </Text>
                </View>
                {!address.isDefault && (
                  <Button
                    mode="outlined"
                    onPress={() => handleSetDefault(address.id)}
                    style={styles.setDefaultButton}
                  >
                    Set as Default
                  </Button>
                )}
              </View>
            </Surface>
          ))}
        </View>
      </ScrollView>
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleAdd}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  cardTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressName: {
    marginLeft: spacing.sm,
    marginRight: spacing.sm,
  },
  defaultBadge: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultText: {
    color: '#4CAF50',
  },
  cardActions: {
    flexDirection: 'row',
  },
  addressDetails: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: spacing.xs,
  },
  setDefaultButton: {
    margin: spacing.md,
    marginTop: 0,
  },
  fab: {
    position: 'absolute',
    margin: spacing.lg,
    right: 0,
    bottom: 0,
  },
}); 