import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Workout } from '@/types';

interface WorkoutCardProps {
  workout: Workout;
  onPress: () => void;
}

const difficultyColor = {
  Débutant: Colors.success,
  Intermédiaire: Colors.warning,
  Avancé: Colors.primary,
};

export function WorkoutCard({ workout, onPress }: WorkoutCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{workout.title}</Text>
            {workout.completed && (
              <View style={styles.completedBadge}>
                <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
              </View>
            )}
          </View>
          <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor[workout.difficulty] + '22' }]}>
            <Text style={[styles.difficulty, { color: difficultyColor[workout.difficulty] }]}>
              {workout.difficulty}
            </Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>{workout.description}</Text>

        <View style={styles.tags}>
          {workout.muscle_groups.slice(0, 3).map((group) => (
            <View key={group} style={styles.tag}>
              <Text style={styles.tagText}>{group}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.stat}>
            <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.statText}>{workout.duration_minutes} min</Text>
          </View>
          <View style={styles.stat}>
            <Ionicons name="barbell-outline" size={14} color={Colors.textSecondary} />
            <Text style={styles.statText}>{workout.exercises.length} exercices</Text>
          </View>
          <View style={styles.chevron}>
            <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  title: { color: Colors.text, fontSize: 16, fontWeight: '700', flex: 1 },
  completedBadge: { marginLeft: 6 },
  difficultyBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  difficulty: { fontSize: 11, fontWeight: '600' },
  description: { color: Colors.textSecondary, fontSize: 13, lineHeight: 18, marginBottom: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  tag: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: { color: Colors.textSecondary, fontSize: 11, fontWeight: '500' },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statText: { color: Colors.textSecondary, fontSize: 12 },
  chevron: { marginLeft: 'auto' },
});
