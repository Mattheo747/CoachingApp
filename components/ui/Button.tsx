import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({ label, onPress, variant = 'primary', loading, disabled, style }: ButtonProps) {
  if (variant === 'primary') {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled || loading} style={[styles.wrapper, style]}>
        <LinearGradient
          colors={Colors.gradient.primary as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryLabel}>{label}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.outline, style]}
      >
        {loading ? (
          <ActivityIndicator color={Colors.primary} />
        ) : (
          <Text style={styles.outlineLabel}>{label}</Text>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || loading} style={[styles.ghost, style]}>
      <Text style={styles.ghostLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: { borderRadius: 12, overflow: 'hidden' },
  gradient: { paddingVertical: 14, paddingHorizontal: 24, alignItems: 'center' },
  primaryLabel: { color: '#fff', fontSize: 16, fontWeight: '700' },
  outline: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  outlineLabel: { color: Colors.primary, fontSize: 16, fontWeight: '600' },
  ghost: { paddingVertical: 8, paddingHorizontal: 16, alignItems: 'center' },
  ghostLabel: { color: Colors.textSecondary, fontSize: 15 },
});
