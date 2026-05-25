import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { WorkoutCard } from '@/components/WorkoutCard';
import { Workout } from '@/types';

const MOCK_WORKOUTS: Workout[] = [
  {
    id: '1',
    title: 'Push Day - Pectoraux & Épaules',
    description: 'Séance axée sur le développement de la force des pectoraux et deltoïdes antérieurs.',
    duration_minutes: 75,
    difficulty: 'Intermédiaire',
    muscle_groups: ['Pectoraux', 'Épaules', 'Triceps'],
    exercises: [
      { id: 'e1', name: 'Développé couché', sets: 4, reps: '8-10', rest_seconds: 90 },
      { id: 'e2', name: 'Développé incliné haltères', sets: 3, reps: '10-12', rest_seconds: 75 },
      { id: 'e3', name: 'Écarté poulie', sets: 3, reps: '12-15', rest_seconds: 60 },
      { id: 'e4', name: 'Développé militaire', sets: 4, reps: '8-10', rest_seconds: 90 },
      { id: 'e5', name: 'Élévations latérales', sets: 3, reps: '12-15', rest_seconds: 60 },
    ],
    created_by: 'coach1',
    completed: false,
    created_at: new Date().toISOString(),
    scheduled_date: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Pull Day - Dos & Biceps',
    description: 'Séance complète du dos avec focus sur l\'épaisseur et la largeur dorsale.',
    duration_minutes: 70,
    difficulty: 'Intermédiaire',
    muscle_groups: ['Dos', 'Biceps', 'Trapèzes'],
    exercises: [
      { id: 'e6', name: 'Tractions lestées', sets: 4, reps: '6-8', rest_seconds: 120 },
      { id: 'e7', name: 'Rowing barre', sets: 4, reps: '8-10', rest_seconds: 90 },
      { id: 'e8', name: 'Curl barre', sets: 3, reps: '10-12', rest_seconds: 60 },
    ],
    created_by: 'coach1',
    completed: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Leg Day - Jambes complètes',
    description: 'Développement complet des membres inférieurs : quadriceps, ischio-jambiers, fessiers.',
    duration_minutes: 90,
    difficulty: 'Avancé',
    muscle_groups: ['Quadriceps', 'Ischio-jambiers', 'Fessiers', 'Mollets'],
    exercises: [
      { id: 'e9', name: 'Squat', sets: 5, reps: '5', rest_seconds: 180 },
      { id: 'e10', name: 'Leg press', sets: 4, reps: '10-12', rest_seconds: 90 },
    ],
    created_by: 'coach1',
    completed: false,
    created_at: new Date(Date.now() + 86400000).toISOString(),
    scheduled_date: new Date(Date.now() + 86400000).toISOString(),
  },
];

const FILTERS = ['Tous', 'Aujourd\'hui', 'Cette semaine', 'Terminés'];

export default function EntraineementsScreen() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const filtered = MOCK_WORKOUTS.filter((w) => {
    if (activeFilter === 'Terminés') return w.completed;
    if (activeFilter === 'Aujourd\'hui') {
      return w.scheduled_date && new Date(w.scheduled_date).toDateString() === new Date().toDateString();
    }
    return true;
  });

  if (selectedWorkout) {
    return <WorkoutDetail workout={selectedWorkout} onBack={() => setSelectedWorkout(null)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Mes entraînements</Text>
          <Text style={styles.subtitle}>{MOCK_WORKOUTS.filter(w => !w.completed).length} séances à venir</Text>
        </View>
        <TouchableOpacity style={styles.calendarBtn}>
          <Ionicons name="calendar-outline" size={22} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <StatBadge icon="flame" label="Cette semaine" value="3" color={Colors.primary} />
        <StatBadge icon="checkmark-circle" label="Terminées" value="1" color={Colors.success} />
        <StatBadge icon="time" label="Temps total" value="2h15" color={Colors.info} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filters}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => setActiveFilter(f)}
            style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="barbell-outline" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>Aucune séance trouvée</Text>
          </View>
        ) : (
          filtered.map((w) => (
            <WorkoutCard key={w.id} workout={w} onPress={() => setSelectedWorkout(w)} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatBadge({ icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <View style={[statStyles.badge, { borderColor: color + '40' }]}>
      <Ionicons name={icon} size={16} color={color} />
      <Text style={statStyles.value}>{value}</Text>
      <Text style={statStyles.label}>{label}</Text>
    </View>
  );
}

function WorkoutDetail({ workout, onBack }: { workout: Workout; onBack: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#3D0000', '#0D0D0D']} style={detailStyles.hero}>
          <TouchableOpacity onPress={onBack} style={detailStyles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </TouchableOpacity>
          <Text style={detailStyles.title}>{workout.title}</Text>
          <View style={detailStyles.metaRow}>
            <View style={detailStyles.metaBadge}>
              <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
              <Text style={detailStyles.metaText}>{workout.duration_minutes} min</Text>
            </View>
            <View style={detailStyles.metaBadge}>
              <Ionicons name="barbell-outline" size={14} color={Colors.textSecondary} />
              <Text style={detailStyles.metaText}>{workout.exercises.length} exercices</Text>
            </View>
            <View style={[detailStyles.metaBadge, { borderColor: Colors.warning + '40' }]}>
              <Text style={[detailStyles.metaText, { color: Colors.warning }]}>{workout.difficulty}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={detailStyles.body}>
          <Text style={detailStyles.desc}>{workout.description}</Text>

          <Text style={detailStyles.sectionTitle}>Muscles ciblés</Text>
          <View style={detailStyles.tagsRow}>
            {workout.muscle_groups.map((m) => (
              <View key={m} style={detailStyles.tag}>
                <Text style={detailStyles.tagText}>{m}</Text>
              </View>
            ))}
          </View>

          <Text style={detailStyles.sectionTitle}>Programme des exercices</Text>
          {workout.exercises.map((ex, i) => (
            <View key={ex.id} style={detailStyles.exerciseCard}>
              <View style={detailStyles.exerciseNum}>
                <Text style={detailStyles.exerciseNumText}>{i + 1}</Text>
              </View>
              <View style={detailStyles.exerciseInfo}>
                <Text style={detailStyles.exerciseName}>{ex.name}</Text>
                <View style={detailStyles.exerciseMeta}>
                  <Text style={detailStyles.exerciseDetail}>{ex.sets} séries × {ex.reps} reps</Text>
                  <Text style={detailStyles.exerciseRest}>Repos: {ex.rest_seconds}s</Text>
                </View>
                {ex.notes && <Text style={detailStyles.exerciseNotes}>{ex.notes}</Text>}
              </View>
            </View>
          ))}

          <TouchableOpacity style={detailStyles.startBtn}>
            <LinearGradient colors={Colors.gradient.primary as [string, string]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={detailStyles.startBtnGradient}>
              <Ionicons name="play" size={20} color="#fff" />
              <Text style={detailStyles.startBtnText}>Démarrer la séance</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16 },
  greeting: { color: Colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: Colors.textSecondary, fontSize: 13, marginTop: 2 },
  calendarBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 10, marginBottom: 16 },
  filterScroll: { paddingLeft: 20, marginBottom: 8 },
  filters: { gap: 8, paddingRight: 20 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { color: Colors.textSecondary, fontSize: 13, fontWeight: '500' },
  filterTextActive: { color: '#fff', fontWeight: '700' },
  list: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 100 },
  empty: { alignItems: 'center', marginTop: 60, gap: 12 },
  emptyText: { color: Colors.textMuted, fontSize: 15 },
});

const statStyles = StyleSheet.create({
  badge: { flex: 1, backgroundColor: Colors.surface, borderRadius: 12, padding: 10, alignItems: 'center', gap: 2, borderWidth: 1 },
  value: { color: Colors.text, fontSize: 16, fontWeight: '800' },
  label: { color: Colors.textMuted, fontSize: 10, fontWeight: '500', textAlign: 'center' },
});

const detailStyles = StyleSheet.create({
  hero: { paddingTop: 56, paddingBottom: 24, paddingHorizontal: 20 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { color: Colors.text, fontSize: 24, fontWeight: '800', marginBottom: 12 },
  metaRow: { flexDirection: 'row', gap: 8 },
  metaBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  metaText: { color: Colors.textSecondary, fontSize: 12 },
  body: { padding: 20 },
  desc: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21, marginBottom: 24 },
  sectionTitle: { color: Colors.text, fontSize: 16, fontWeight: '700', marginBottom: 12 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 },
  tag: { backgroundColor: Colors.surfaceElevated, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: Colors.border },
  tagText: { color: Colors.textSecondary, fontSize: 12, fontWeight: '500' },
  exerciseCard: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: Colors.border, gap: 12 },
  exerciseNum: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primary + '20', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.primary + '40' },
  exerciseNumText: { color: Colors.primary, fontSize: 13, fontWeight: '700' },
  exerciseInfo: { flex: 1 },
  exerciseName: { color: Colors.text, fontSize: 14, fontWeight: '600', marginBottom: 4 },
  exerciseMeta: { flexDirection: 'row', gap: 12 },
  exerciseDetail: { color: Colors.textSecondary, fontSize: 12 },
  exerciseRest: { color: Colors.textMuted, fontSize: 12 },
  exerciseNotes: { color: Colors.info, fontSize: 11, marginTop: 4 },
  startBtn: { borderRadius: 14, overflow: 'hidden', marginTop: 24 },
  startBtnGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, gap: 8 },
  startBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
