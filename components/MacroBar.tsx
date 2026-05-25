import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

interface MacroBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
  unit?: string;
}

export function MacroBar({ label, value, total, color, unit = 'g' }: MacroBarProps) {
  const percent = total > 0 ? Math.min((value / total) * 100, 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {value}{unit} <Text style={styles.total}>/ {total}{unit}</Text>
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%` as any, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  label: { color: Colors.textSecondary, fontSize: 12 },
  value: { color: Colors.text, fontSize: 12, fontWeight: '600' },
  total: { color: Colors.textMuted, fontWeight: '400' },
  track: {
    height: 6,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 3 },
});
