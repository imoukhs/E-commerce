import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, List, Switch, useTheme as usePaperTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing } from '../../theme/spacing';
import type { CustomTheme } from '../../theme/types';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainStackParamList } from '../../navigation/types';

type Props = NativeStackScreenProps<MainStackParamList, 'Notifications'>;

export default function NotificationsScreen({ navigation }: Props) {
  const theme = usePaperTheme<CustomTheme>();
  const [settings, setSettings] = useState({
    pushEnabled: true,
    orderUpdates: true,
    promotions: false,
    newProducts: true,
    priceAlerts: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <ScrollView>
        <List.Section>
          <List.Item
            title="Push Notifications"
            description="Enable or disable all notifications"
            right={() => <Switch value={settings.pushEnabled} onValueChange={() => toggleSetting('pushEnabled')} />}
          />
        </List.Section>

        <List.Section>
          <List.Subheader style={[theme.typography.titleMedium]}>Notification Types</List.Subheader>
          <List.Item
            title="Order Updates"
            right={() => <Switch value={settings.orderUpdates} onValueChange={() => toggleSetting('orderUpdates')} />}
          />
          <List.Item
            title="Promotions & Offers"
            right={() => <Switch value={settings.promotions} onValueChange={() => toggleSetting('promotions')} />}
          />
          <List.Item
            title="New Products"
            right={() => <Switch value={settings.newProducts} onValueChange={() => toggleSetting('newProducts')} />}
          />
          <List.Item
            title="Price Alerts"
            right={() => <Switch value={settings.priceAlerts} onValueChange={() => toggleSetting('priceAlerts')} />}
          />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 