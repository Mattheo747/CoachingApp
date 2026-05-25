import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';

const MOCK_STATS = {
  totalWorkouts: 24,
  totalHours: 38,
  currentStreak: 5,
  longestStreak: 12,
  weightStart: 80,
  weightCurrent: 82.5,
  monthsCoaching: 3,
};

const MENU_SECTIONS = [
  {
    title: 'Mon suivi',
    items: [
      { icon: 'trophy-outline', label: 'Mes objectifs', color: Colors.warning },
      { icon: 'stats-chart-outline', label: 'Statistiques détaillées', color: Colors.info },
      { icon: 'calendar-outline', label: 'Historique des séances', color: Colors.success },
      { icon: 'camera-outline', label: 'Photos de progression', color: Colors.primary },
    ],
  },
  {
    title: 'Paramètres',
    items: [
      { icon: 'person-outline', label: 'Informations personnelles', color: Colors.textSecondary },
      { icon: 'notifications-outline', label: 'Notifications', color: Colors.textSecondary },
      { icon: 'shield-checkmark-outline', label: 'Confidentialité', color: Colors.textSecondary },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: 'help-circle-outline', label: 'Aide & FAQ', color: Colors.textSecondary },
      { icon: 'chatbubble-outline', label: 'Contacter le support', color: Colors.textSecondary },
    ],
  },
];

export default function ProfilScreen() {
  const { session, signOut } = useAuth();
  const userName = session?.user?.user_metadata?.full_name ?? 'Utilisateur';
  const userEmail = session?.user?.email ?? '';

  const handleSignOut = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Déconnexion', style: 'destructive', onPress: signOut },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <LinearGradient colors={['#1A0000', '#0D0D0D']} style={styles.profileHero}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userName.charAt(0).toUpperCase()}</Text>
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="camera" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          <View style={styles.coachBadge}>
            <Ionicons name="person-circle" size={13} color={Colors.info} />
            <Text style={styles.coachText}>Suivi par Coach Thomas</Text>
          </View>
        </LinearGradient>

        <View style={styles.statsGrid}>
          <StatItem icon="barbell" value={MOCK_STATS.totalWorkouts} label="Séances" color={Colors.primary} />
          <StatItem icon="time" value={`${MOCK_STATS.totalHours}h`} label="Entraîné" color={Colors.info} />
          <StatItem icon="flame" value={MOCK_STATS.currentStreak} label="Jours suite" color={Colors.warning} />
          <StatItem icon="trending-up" value={`+${(MOCK_STATS.weightCurrent - MOCK_STATS.weightStart).toFixed(1)}kg`} label="Progression" color={Colors.success} />
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Progression poids</Text>
          <View style={styles.progressRow}>
            <View style={styles.progressPoint}>
              <Text style={styles.progressWeight}>{MOCK_STATS.weightStart} kg</Text>
              <Text style={styles.progressLabel}>Départ</Text>
            </View>
            <View style={styles.progressLine}>
              <View style={styles.progressFill} />
              <Ionicons name="arrow-forward" size={16} color={Colors.success} />
            </View>
            <View style={styles.progressPoint}>
              <Text style={[styles.progressWeight, { color: Colors.success }]}>{MOCK_STATS.weightCurrent} kg</Text>
              <Text style={styles.progressLabel}>Aujourd'hui</Text>
            </View>
          </View>
          <Text style={styles.progressSub}>{MOCK_STATS.monthsCoaching} mois de coaching · Meilleur streak: {MOCK_STATS.longestStreak}j</Text>
        </View>

        {MENU_SECTIONS.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, i) => (
                <TouchableOpacity key={item.label} style={[styles.menuItem, i < section.items.length - 1 && styles.menuItemBorder]}>
                  <View style={[styles.menuIcon, { backgroundColor: item.color + '20' }]}>
                    <Ionicons name={item.icon as any} size={18} color={item.color} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={18} color={Colors.primary} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <Text style={styles.version}>CoachPro v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatItem({ icon, value, label, color }: { icon: any; value: string | number; label: string; color: string }) {
  return (
    <View style={[statStyles.item, { borderColor: color + '30' }]}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={statStyles.value}>{value}</Text>
      <Text style={statStyles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 100 },
  profileHero: { alignItems: 'center', paddingTop: 24, paddingBottom: 28, paddingHorizontal: 20 },
  avatarWrapper: { position: 'relative', marginBottom: 14 },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: Colors.primary + '60' },
  avatarText: { color: '#fff', fontSize: 34, fontWeight: '800' },
  editAvatarBtn: { position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: 13, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.background },
  userName: { color: Colors.text, fontSize: 22, fontWeight: '800', marginBottom: 4 },
  userEmail: { color: Colors.textSecondary, fontSize: 13, marginBottom: 12 },
  coachBadge: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: Colors.info + '15', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  coachText: { color: Colors.info, fontSize: 12, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 20, marginTop: 16, marginBottom: 16 },
  progressCard: { marginHorizontal: 20, backgroundColor: Colors.surface, borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  progressTitle: { color: Colors.text, fontSize: 14, fontWeight: '700', marginBottom: 14 },
  progressRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  progressPoint: { alignItems: 'center' },
  progressWeight: { color: Colors.text, fontSize: 20, fontWeight: '800' },
  progressLabel: { color: Colors.textMuted, fontSize: 11 },
  progressLine: { flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 },
  progressFill: { flex: 1, height: 2, backgroundColor: Colors.success, marginRight: 4 },
  progressSub: { color: Colors.textMuted, fontSize: 11, marginTop: 12, textAlign: 'center' },
  menuSection: { paddingHorizontal: 20, marginBottom: 16 },
  menuSectionTitle: { color: Colors.textSecondary, fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  menuCard: { backgroundColor: Colors.surface, borderRadius: 14, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, gap: 12 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.border },
  menuIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, color: Colors.text, fontSize: 14 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, marginBottom: 12, paddingVertical: 14, backgroundColor: Colors.surface, borderRadius: 14, borderWidth: 1, borderColor: Colors.primary + '40' },
  logoutText: { color: Colors.primary, fontSize: 15, fontWeight: '600' },
  version: { color: Colors.textMuted, fontSize: 12, textAlign: 'center', marginBottom: 16 },
});

const statStyles = StyleSheet.create({
  item: { flex: 1, minWidth: '45%', backgroundColor: Colors.surface, borderRadius: 12, padding: 14, alignItems: 'center', gap: 4, borderWidth: 1 },
  value: { color: Colors.text, fontSize: 20, fontWeight: '900' },
  label: { color: Colors.textMuted, fontSize: 11, fontWeight: '500' },
});
