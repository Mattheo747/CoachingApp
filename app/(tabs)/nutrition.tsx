import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { MacroBar } from '@/components/MacroBar';
import { MealPlan, Meal } from '@/types';

const MOCK_PLAN: MealPlan = {
  id: '1',
  title: 'Plan semaine - Prise de masse',
  date: new Date().toISOString(),
  total_calories: 2800,
  total_protein: 200,
  total_carbs: 320,
  total_fat: 85,
  created_by: 'coach1',
  meals: [
    {
      id: 'm1', name: 'Petit-déjeuner', time: '07:30',
      calories: 650, protein: 45, carbs: 80, fat: 18,
      foods: [
        { name: 'Flocons d\'avoine', quantity: '100g', calories: 360, protein: 12, carbs: 62, fat: 6 },
        { name: 'Blancs d\'œufs', quantity: '200g', calories: 100, protein: 22, carbs: 0, fat: 0 },
        { name: 'Banane', quantity: '1 pièce', calories: 90, protein: 1, carbs: 23, fat: 0 },
        { name: 'Whey protéine', quantity: '30g', calories: 120, protein: 24, carbs: 3, fat: 2 },
      ],
    },
    {
      id: 'm2', name: 'Collation matin', time: '10:00',
      calories: 350, protein: 30, carbs: 40, fat: 8,
      foods: [
        { name: 'Fromage blanc 0%', quantity: '200g', calories: 100, protein: 20, carbs: 6, fat: 0 },
        { name: 'Myrtilles', quantity: '100g', calories: 60, protein: 1, carbs: 14, fat: 0 },
        { name: 'Amandes', quantity: '30g', calories: 180, protein: 6, carbs: 6, fat: 16 },
      ],
    },
    {
      id: 'm3', name: 'Déjeuner', time: '12:30',
      calories: 750, protein: 55, carbs: 90, fat: 20,
      foods: [
        { name: 'Poulet grillé', quantity: '200g', calories: 240, protein: 44, carbs: 0, fat: 5 },
        { name: 'Riz basmati', quantity: '150g cuit', calories: 200, protein: 4, carbs: 45, fat: 0 },
        { name: 'Légumes vapeur', quantity: '200g', calories: 60, protein: 3, carbs: 12, fat: 0 },
        { name: 'Huile d\'olive', quantity: '15ml', calories: 130, protein: 0, carbs: 0, fat: 14 },
      ],
    },
    {
      id: 'm4', name: 'Pre-workout', time: '17:00',
      calories: 400, protein: 30, carbs: 55, fat: 8,
      foods: [
        { name: 'Riz complet', quantity: '100g cuit', calories: 130, protein: 3, carbs: 28, fat: 1 },
        { name: 'Thon en boîte', quantity: '120g', calories: 130, protein: 28, carbs: 0, fat: 2 },
        { name: 'Pomme', quantity: '1 pièce', calories: 80, protein: 0, carbs: 21, fat: 0 },
      ],
    },
    {
      id: 'm5', name: 'Post-workout & Dîner', time: '20:00',
      calories: 650, protein: 50, carbs: 70, fat: 18,
      foods: [
        { name: 'Saumon', quantity: '200g', calories: 300, protein: 40, carbs: 0, fat: 14 },
        { name: 'Patate douce', quantity: '200g cuite', calories: 180, protein: 3, carbs: 42, fat: 0 },
        { name: 'Salade verte', quantity: '80g', calories: 15, protein: 1, carbs: 2, fat: 0 },
      ],
    },
  ],
};

const CONSUMED = { calories: 1750, protein: 130, carbs: 185, fat: 52 };

export default function NutritionScreen() {
  const [expandedMeal, setExpandedMeal] = useState<string | null>('m1');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Nutrition</Text>
            <Text style={styles.subtitle}>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="options-outline" size={20} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <LinearGradient colors={['#1A1A00', '#0D0D0D']} style={styles.summaryCard}>
          <View style={styles.calorieRow}>
            <View style={styles.calorieMain}>
              <Text style={styles.calorieValue}>{CONSUMED.calories}</Text>
              <Text style={styles.calorieUnit}>kcal consommées</Text>
            </View>
            <View style={styles.calorieTarget}>
              <Text style={styles.calorieTargetValue}>/ {MOCK_PLAN.total_calories}</Text>
              <Text style={styles.calorieTargetLabel}>objectif</Text>
            </View>
            <View style={styles.ring}>
              <Text style={styles.ringPercent}>{Math.round((CONSUMED.calories / MOCK_PLAN.total_calories) * 100)}%</Text>
            </View>
          </View>

          <View style={styles.macros}>
            <MacroBar label="Protéines" value={CONSUMED.protein} total={MOCK_PLAN.total_protein} color={Colors.primary} />
            <MacroBar label="Glucides" value={CONSUMED.carbs} total={MOCK_PLAN.total_carbs} color={Colors.info} />
            <MacroBar label="Lipides" value={CONSUMED.fat} total={MOCK_PLAN.total_fat} color={Colors.warning} />
          </View>
        </LinearGradient>

        <View style={styles.planHeader}>
          <Text style={styles.planTitle}>{MOCK_PLAN.title}</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>Modifier</Text>
          </TouchableOpacity>
        </View>

        {MOCK_PLAN.meals.map((meal) => (
          <MealItem
            key={meal.id}
            meal={meal}
            expanded={expandedMeal === meal.id}
            onToggle={() => setExpandedMeal(expandedMeal === meal.id ? null : meal.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function MealItem({ meal, expanded, onToggle }: { meal: Meal; expanded: boolean; onToggle: () => void }) {
  return (
    <View style={mealStyles.card}>
      <TouchableOpacity onPress={onToggle} style={mealStyles.header} activeOpacity={0.8}>
        <View style={mealStyles.left}>
          <View style={mealStyles.timeCircle}>
            <Text style={mealStyles.timeText}>{meal.time}</Text>
          </View>
          <View>
            <Text style={mealStyles.name}>{meal.name}</Text>
            <Text style={mealStyles.cals}>{meal.calories} kcal · P: {meal.protein}g · G: {meal.carbs}g · L: {meal.fat}g</Text>
          </View>
        </View>
        <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.textMuted} />
      </TouchableOpacity>

      {expanded && (
        <View style={mealStyles.foods}>
          {meal.foods.map((food, i) => (
            <View key={i} style={mealStyles.foodRow}>
              <View style={mealStyles.foodLeft}>
                <Text style={mealStyles.foodName}>{food.name}</Text>
                <Text style={mealStyles.foodQty}>{food.quantity}</Text>
              </View>
              <View style={mealStyles.foodRight}>
                <Text style={mealStyles.foodCal}>{food.calories} kcal</Text>
                <Text style={mealStyles.foodMacro}>P{food.protein} G{food.carbs} L{food.fat}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16 },
  title: { color: Colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: Colors.textSecondary, fontSize: 13, marginTop: 2 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.border },
  summaryCard: { marginHorizontal: 20, borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  calorieRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  calorieMain: { flex: 1 },
  calorieValue: { color: Colors.text, fontSize: 36, fontWeight: '900' },
  calorieUnit: { color: Colors.textSecondary, fontSize: 12 },
  calorieTarget: { alignItems: 'flex-end', marginRight: 16 },
  calorieTargetValue: { color: Colors.textSecondary, fontSize: 16, fontWeight: '600' },
  calorieTargetLabel: { color: Colors.textMuted, fontSize: 11 },
  ring: { width: 56, height: 56, borderRadius: 28, borderWidth: 3, borderColor: Colors.warning, alignItems: 'center', justifyContent: 'center' },
  ringPercent: { color: Colors.warning, fontSize: 13, fontWeight: '800' },
  macros: {},
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 },
  planTitle: { color: Colors.text, fontSize: 16, fontWeight: '700' },
  seeAll: { color: Colors.primary, fontSize: 13, fontWeight: '600' },
});

const mealStyles = StyleSheet.create({
  card: { marginHorizontal: 20, backgroundColor: Colors.surface, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  timeCircle: { backgroundColor: Colors.surfaceElevated, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  timeText: { color: Colors.primary, fontSize: 12, fontWeight: '700' },
  name: { color: Colors.text, fontSize: 14, fontWeight: '600' },
  cals: { color: Colors.textMuted, fontSize: 11, marginTop: 2 },
  foods: { borderTopWidth: 1, borderTopColor: Colors.border, padding: 14, gap: 8 },
  foodRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  foodLeft: { flex: 1 },
  foodName: { color: Colors.text, fontSize: 13 },
  foodQty: { color: Colors.textMuted, fontSize: 11 },
  foodRight: { alignItems: 'flex-end' },
  foodCal: { color: Colors.textSecondary, fontSize: 13, fontWeight: '600' },
  foodMacro: { color: Colors.textMuted, fontSize: 10 },
});
