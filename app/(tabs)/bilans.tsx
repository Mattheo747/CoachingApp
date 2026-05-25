import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  SafeAreaView, TextInput, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Bilan } from '@/types';

const MOCK_BILANS: Bilan[] = [
  {
    id: '1', user_id: 'user1', coach_id: 'coach1',
    date: new Date(Date.now() - 7 * 86400000).toISOString(),
    weight: 82.5, body_fat: 14.2,
    notes_athlete: 'Semaine difficile, fatigue au travail. Séances respectées mais intensité réduite. Appétit réduit.',
    notes_coach: 'Bonne gestion de la fatigue. Continue sur cette lancée. Pense à prioriser le sommeil. Légère augmentation des calories en jours de repos conseillée.',
    measurements: { chest: 102, waist: 82, hips: 98, bicep: 40, thigh: 58 },
    status: 'reviewed',
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: '2', user_id: 'user1', coach_id: 'coach1',
    date: new Date(Date.now() - 14 * 86400000).toISOString(),
    weight: 83.1, body_fat: 14.8,
    notes_athlete: 'Super semaine ! J\'ai battu mon record au squat. Nutrition parfaite toute la semaine.',
    notes_coach: 'Excellente progression. +0.6kg de masse, on continue dans cette direction. Augmentation des charges validée.',
    measurements: { chest: 101, waist: 83, hips: 97, bicep: 39.5, thigh: 57.5 },
    status: 'reviewed',
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
];

export default function BilansScreen() {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedBilan, setSelectedBilan] = useState<Bilan | null>(null);

  const handleSubmit = () => {
    if (!notes.trim()) {
      Alert.alert('Erreur', 'Veuillez écrire un compte-rendu.');
      return;
    }
    Alert.alert('Bilan envoyé !', 'Votre coach a été notifié et répondra sous 24h.', [
      { text: 'OK', onPress: () => { setShowForm(false); setNotes(''); setWeight(''); } },
    ]);
  };

  if (selectedBilan) {
    return <BilanDetail bilan={selectedBilan} onBack={() => setSelectedBilan(null)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Bilans Coach</Text>
          <Text style={styles.subtitle}>Suivi & progression</Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowForm(!showForm)}
          style={[styles.addBtn, showForm && styles.addBtnActive]}
        >
          <Ionicons name={showForm ? 'close' : 'add'} size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Nouveau bilan</Text>
            <Text style={styles.formSubtitle}>Partagez votre semaine avec votre coach</Text>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Poids actuel (kg)</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="Ex: 82.5"
                  placeholderTextColor={Colors.textMuted}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Compte-rendu de la semaine *</Text>
              <TextInput
                style={styles.textArea}
                value={notes}
                onChangeText={setNotes}
                placeholder="Comment s'est passée votre semaine ? Entraînements, nutrition, récupération, moral..."
                placeholderTextColor={Colors.textMuted}
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <LinearGradient colors={Colors.gradient.primary as [string, string]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.submitGradient}>
                <Ionicons name="send" size={16} color="#fff" />
                <Text style={styles.submitText}>Envoyer au coach</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Évolution du poids</Text>
          <View style={styles.progressChart}>
            {MOCK_BILANS.slice().reverse().map((b, i) => (
              <View key={b.id} style={styles.chartBar}>
                <Text style={styles.chartValue}>{b.weight}kg</Text>
                <View style={[styles.bar, { height: ((b.weight ?? 80) - 78) * 20 + 20 }]} />
                <Text style={styles.chartDate}>S-{MOCK_BILANS.length - i}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Historique</Text>
        {MOCK_BILANS.map((bilan) => (
          <BilanCard key={bilan.id} bilan={bilan} onPress={() => setSelectedBilan(bilan)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function BilanCard({ bilan, onPress }: { bilan: Bilan; onPress: () => void }) {
  const date = new Date(bilan.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={bilanCardStyles.card}>
      <View style={bilanCardStyles.topRow}>
        <View>
          <Text style={bilanCardStyles.date}>{date}</Text>
          {bilan.weight && <Text style={bilanCardStyles.weight}>{bilan.weight} kg</Text>}
        </View>
        <View style={[bilanCardStyles.statusBadge, bilan.status === 'reviewed' && bilanCardStyles.statusReviewed]}>
          <Ionicons
            name={bilan.status === 'reviewed' ? 'checkmark-circle' : 'time-outline'}
            size={14}
            color={bilan.status === 'reviewed' ? Colors.success : Colors.warning}
          />
          <Text style={[bilanCardStyles.statusText, bilan.status === 'reviewed' && { color: Colors.success }]}>
            {bilan.status === 'reviewed' ? 'Répondu' : 'En attente'}
          </Text>
        </View>
      </View>
      <Text style={bilanCardStyles.notes} numberOfLines={2}>{bilan.notes_athlete}</Text>
      {bilan.notes_coach && (
        <View style={bilanCardStyles.coachReply}>
          <Ionicons name="chatbubble-outline" size={12} color={Colors.info} />
          <Text style={bilanCardStyles.coachReplyText} numberOfLines={1}>{bilan.notes_coach}</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} style={bilanCardStyles.chevron} />
    </TouchableOpacity>
  );
}

function BilanDetail({ bilan, onBack }: { bilan: Bilan; onBack: () => void }) {
  const date = new Date(bilan.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#001A20', '#0D0D0D']} style={detailStyles.hero}>
          <TouchableOpacity onPress={onBack} style={detailStyles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </TouchableOpacity>
          <Text style={detailStyles.date}>{date}</Text>
          {bilan.weight && (
            <View style={detailStyles.weightRow}>
              <Text style={detailStyles.weight}>{bilan.weight} kg</Text>
              {bilan.body_fat && <Text style={detailStyles.fat}>{bilan.body_fat}% MG</Text>}
            </View>
          )}
        </LinearGradient>

        <View style={detailStyles.body}>
          {bilan.measurements && (
            <>
              <Text style={detailStyles.sectionTitle}>Mensurations</Text>
              <View style={detailStyles.measureGrid}>
                {Object.entries(bilan.measurements).filter(([, v]) => v).map(([key, val]) => (
                  <View key={key} style={detailStyles.measureItem}>
                    <Text style={detailStyles.measureVal}>{val} cm</Text>
                    <Text style={detailStyles.measureKey}>{key}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          <Text style={detailStyles.sectionTitle}>Votre compte-rendu</Text>
          <View style={detailStyles.noteBox}>
            <Text style={detailStyles.noteText}>{bilan.notes_athlete}</Text>
          </View>

          {bilan.notes_coach && (
            <>
              <Text style={[detailStyles.sectionTitle, { color: Colors.info }]}>
                <Ionicons name="chatbubble" size={15} color={Colors.info} /> Réponse du coach
              </Text>
              <View style={[detailStyles.noteBox, { borderColor: Colors.info + '40', backgroundColor: Colors.info + '08' }]}>
                <Text style={[detailStyles.noteText, { color: Colors.info + 'CC' }]}>{bilan.notes_coach}</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16 },
  title: { color: Colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: Colors.textSecondary, fontSize: 13, marginTop: 2 },
  addBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  addBtnActive: { backgroundColor: Colors.textMuted },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  formCard: { backgroundColor: Colors.surface, borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  formTitle: { color: Colors.text, fontSize: 18, fontWeight: '700', marginBottom: 4 },
  formSubtitle: { color: Colors.textSecondary, fontSize: 13, marginBottom: 20 },
  fieldGroup: { marginBottom: 16 },
  fieldLabel: { color: Colors.textSecondary, fontSize: 13, fontWeight: '600', marginBottom: 6 },
  inputWrapper: { backgroundColor: Colors.surfaceElevated, borderRadius: 10, borderWidth: 1, borderColor: Colors.border },
  input: { color: Colors.text, fontSize: 15, paddingHorizontal: 14, paddingVertical: 12 },
  textArea: { backgroundColor: Colors.surfaceElevated, borderRadius: 10, borderWidth: 1, borderColor: Colors.border, color: Colors.text, fontSize: 14, padding: 14, minHeight: 110 },
  submitBtn: { borderRadius: 12, overflow: 'hidden', marginTop: 4 },
  submitGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, gap: 8 },
  submitText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  progressSection: { backgroundColor: Colors.surface, borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  sectionTitle: { color: Colors.text, fontSize: 16, fontWeight: '700', marginBottom: 12 },
  progressChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 16, height: 80, paddingTop: 20 },
  chartBar: { flex: 1, alignItems: 'center', gap: 4 },
  chartValue: { color: Colors.textSecondary, fontSize: 10 },
  bar: { width: '100%', backgroundColor: Colors.primary, borderRadius: 4, minHeight: 20 },
  chartDate: { color: Colors.textMuted, fontSize: 10 },
});

const bilanCardStyles = StyleSheet.create({
  card: { backgroundColor: Colors.surface, borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: Colors.border },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  date: { color: Colors.text, fontSize: 14, fontWeight: '700' },
  weight: { color: Colors.primary, fontSize: 18, fontWeight: '800', marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, backgroundColor: Colors.warning + '15' },
  statusReviewed: { backgroundColor: Colors.success + '15' },
  statusText: { fontSize: 11, fontWeight: '600', color: Colors.warning },
  notes: { color: Colors.textSecondary, fontSize: 13, lineHeight: 18, marginBottom: 8 },
  coachReply: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  coachReplyText: { color: Colors.info, fontSize: 12, flex: 1 },
  chevron: { position: 'absolute', right: 16, top: '50%' },
});

const detailStyles = StyleSheet.create({
  hero: { paddingTop: 56, paddingBottom: 24, paddingHorizontal: 20 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  date: { color: Colors.textSecondary, fontSize: 14, marginBottom: 8 },
  weightRow: { flexDirection: 'row', alignItems: 'baseline', gap: 12 },
  weight: { color: Colors.text, fontSize: 36, fontWeight: '900' },
  fat: { color: Colors.textSecondary, fontSize: 18 },
  body: { padding: 20 },
  sectionTitle: { color: Colors.text, fontSize: 16, fontWeight: '700', marginBottom: 12, marginTop: 8 },
  measureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  measureItem: { backgroundColor: Colors.surface, borderRadius: 10, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: Colors.border, minWidth: 90 },
  measureVal: { color: Colors.text, fontSize: 18, fontWeight: '800' },
  measureKey: { color: Colors.textMuted, fontSize: 11, marginTop: 2, textTransform: 'capitalize' },
  noteBox: { backgroundColor: Colors.surface, borderRadius: 12, padding: 16, borderWidth: 1, borderColor: Colors.border, marginBottom: 16 },
  noteText: { color: Colors.textSecondary, fontSize: 14, lineHeight: 21 },
});
