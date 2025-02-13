import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

interface RatingProps {
  value: number;
  size?: number;
  color?: string;
  readonly?: boolean;
  onChange?: (value: number) => void;
}

export function Rating({
  value,
  size = 16,
  color = '#FFC107',
  readonly = true,
  onChange,
}: RatingProps) {
  const handlePress = (index: number) => {
    if (!readonly && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => (
        <IconButton
          key={index}
          icon={index < value ? 'star' : 'star-outline'}
          iconColor={color}
          size={size}
          onPress={() => handlePress(index)}
          disabled={readonly}
          style={styles.star}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    margin: 0,
    padding: 0,
  },
}); 