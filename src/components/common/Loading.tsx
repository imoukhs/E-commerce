import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.light.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light.background,
  },
}); 