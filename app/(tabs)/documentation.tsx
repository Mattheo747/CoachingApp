import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { DocArticle } from '@/types';

const CATEGORIES = [
  { key: 'all', label: 'Tout', icon: 'grid-outline' },
  { key: 'technique', label: 'Technique', icon: 'barbell-outline' },
  { key: 'nutrition', label: 'Nutrition', icon: 'nutrition-outline' },
  { key: 'recuperation', label: 'Récupération', icon: 'bed-outline' },
  { key: 'mental', label: 'Mental', icon: 'brain-outline' },
];

const CATEGORY_COLORS: Record<string, string> = {
  technique: Colors.primary,
  nutrition: Colors.warning,
  recuperation: Colors.info,
  mental: '#9B59B6',
};

const MOCK_ARTICLES: DocArticle[] = [
  {
    id: '1', title: 'Les bases du squat : technique parfaite',
    category: 'technique',
    content: `Le squat est l'un des exercices les plus fondamentaux de la musculation. Maîtriser sa technique est essentiel pour progresser en toute sécurité.

**Position de départ**
- Pieds écartés à la largeur des épaules, légèrement orientés vers l'extérieur (15-30°)
- Barre posée sur les trapèzes (squat high bar) ou sur les deltoïdes postérieurs (low bar)
- Regard légèrement vers le haut, colonne neutre

**La descente**
- Inspirez avant de descendre (respiration abdominale)
- Poussez les genoux vers l'extérieur dans l'axe des orteils
- Descendez jusqu'à ce que les cuisses soient parallèles au sol (minimum)
- Gardez le torse aussi vertical que possible

**La remontée**
- Poussez dans le sol comme si vous vouliez l'enfoncer
- Gardez la tension abdominale tout au long du mouvement
- Expirez sur le point de blocage

**Erreurs fréquentes**
- Genoux en valgus (qui rentrent vers l'intérieur)
- Talon qui se lève (manque de mobilité de cheville)
- Perte de la cambrure lombaire (hyperlordose ou flexion)
- Descente trop rapide sans contrôle`,
    image_url: undefined,
    read_time_minutes: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '2', title: 'Protéines : combien et quand en consommer ?',
    category: 'nutrition',
    content: `Les protéines sont les briques de construction de vos muscles. Voici tout ce que vous devez savoir pour optimiser votre apport protéique.

**Besoins en protéines**
Pour un sportif en musculation :
- Maintien musculaire : 1.6g/kg de poids corporel
- Prise de masse : 1.8-2.2g/kg
- Sèche : 2.2-2.8g/kg (pour préserver la masse musculaire)

**Timing des protéines**
Le "timing protéique" a moins d'importance que l'apport total journalier. Cependant :
- Répartissez vos apports en 4-5 prises de 30-40g
- Une prise post-entraînement dans les 2h favorise la récupération
- Une prise avant le coucher (caséine idéalement) réduit le catabolisme nocturne

**Meilleures sources**
- Animales : poulet, œufs, poisson, bœuf, fromage blanc, whey
- Végétales : légumineuses, tofu, tempeh, seitan, protéines de pois

**Supplémentation**
La whey protéine est pratique mais non indispensable si l'alimentation est bien construite. Elle ne remplace pas une alimentation équilibrée.`,
    read_time_minutes: 6,
    created_at: new Date().toISOString(),
  },
  {
    id: '3', title: 'Le sommeil, pilier de la progression',
    category: 'recuperation',
    content: `Le sommeil est souvent négligé, pourtant c'est pendant la nuit que vos muscles se reconstruisent et que votre système nerveux récupère.

**Pourquoi le sommeil est crucial**
- 70% de la sécrétion d'hormone de croissance se fait pendant le sommeil profond
- La synthèse protéique est maximale durant la nuit
- Le système nerveux central récupère et consolide les apprentissages moteurs
- La leptine (hormone de satiété) est régulée pendant le sommeil

**Quantité recommandée**
- 7-9h pour la plupart des adultes
- Les athlètes en phase intensive peuvent nécessiter 9-10h
- La dette de sommeil cumule : impossible de "rattraper" entièrement

**Optimiser la qualité**
- Température idéale : 17-19°C
- Obscurité totale (mélatonine)
- Pas d'écrans 1h avant le coucher (lumière bleue)
- Horaires réguliers (rythme circadien)
- Éviter la caféine après 14h

**Récupération active**
Entre les séances, intégrez :
- Étirements statiques (10-15 min post-séance)
- Marche légère les jours de repos
- Bain froid ou contrasté pour les athlètes avancés`,
    read_time_minutes: 7,
    created_at: new Date().toISOString(),
  },
  {
    id: '4', title: 'Développé couché : guide complet',
    category: 'technique',
    content: `Le développé couché est le roi des exercices de force pectorale. Voici comment l'exécuter correctement et progresser efficacement.

**Setup et position**
- Yeux sous la barre, prise légèrement plus large que les épaules
- Omoplates serrées et "ancrées" dans le banc (rétraction)
- Cambrure naturelle du bas du dos (pas excessive)
- Pieds à plat au sol

**Le mouvement**
1. Saisir la barre en pronation, poignets alignés
2. Descendre la barre vers le bas des pectoraux (ligne du sternum)
3. Contact léger avec la poitrine sans rebond
4. Pousser en arc légèrement vers la tête

**Variations**
- Prise serrée : focus triceps
- Prise large : focus pectoraux, moins d'amplitude
- Incliné : pectoraux supérieurs et épaules
- Décliné : pectoraux inférieurs, force maximale`,
    read_time_minutes: 5,
    created_at: new Date().toISOString(),
  },
  {
    id: '5', title: 'Gérer la pression mentale et les plateaux',
    category: 'mental',
    content: `La progression en musculation n'est pas linéaire. Les plateaux font partie du processus et la gestion mentale est une compétence à développer.

**Comprendre les plateaux**
Un plateau n'est pas un échec, c'est une adaptation. Votre corps s'est adapté au stimulus. C'est le signal qu'il faut changer quelque chose.

**Stratégies pour franchir un plateau**
- Changement de programme (périodisation)
- Augmentation du volume ou de l'intensité
- Deload (semaine de décharge)
- Amélioration de la technique
- Optimisation de la récupération et nutrition

**Gestion du stress**
Le cortisol (hormone du stress) est antagoniste à la progression musculaire :
- Méditation ou cohérence cardiaque (5-10 min/jour)
- Journaling pour identifier les sources de stress
- Ne pas faire de musculation votre seule source d'estime de soi

**La constance avant tout**
"Le meilleur programme est celui qu'on suit." La régularité sur 2-3 ans bat n'importe quelle optimisation à court terme.`,
    read_time_minutes: 6,
    created_at: new Date().toISOString(),
  },
];

export default function DocumentationScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<DocArticle | null>(null);

  const filtered = activeCategory === 'all'
    ? MOCK_ARTICLES
    : MOCK_ARTICLES.filter(a => a.category === activeCategory);

  if (selectedArticle) {
    return <ArticleDetail article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Documentation</Text>
        <Text style={styles.subtitle}>Guides & conseils musculation</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.catScroll}
        contentContainerStyle={styles.catContainer}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            onPress={() => setActiveCategory(cat.key)}
            style={[styles.catChip, activeCategory === cat.key && styles.catChipActive]}
          >
            <Ionicons
              name={cat.icon as any}
              size={14}
              color={activeCategory === cat.key ? '#fff' : Colors.textSecondary}
            />
            <Text style={[styles.catText, activeCategory === cat.key && styles.catTextActive]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {filtered.map((article, i) => (
          <ArticleCard key={article.id} article={article} onPress={() => setSelectedArticle(article)} featured={i === 0 && activeCategory === 'all'} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function ArticleCard({ article, onPress, featured }: { article: DocArticle; onPress: () => void; featured?: boolean }) {
  const color = CATEGORY_COLORS[article.category] ?? Colors.primary;
  const catLabel = CATEGORIES.find(c => c.key === article.category)?.label ?? '';

  if (featured) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={cardStyles.featured}>
        <LinearGradient colors={[color + '40', Colors.surface]} style={cardStyles.featuredGradient}>
          <View style={[cardStyles.catBadge, { backgroundColor: color + '30', borderColor: color + '60' }]}>
            <Text style={[cardStyles.catText, { color }]}>{catLabel}</Text>
          </View>
          <Text style={cardStyles.featuredTitle}>{article.title}</Text>
          <View style={cardStyles.metaRow}>
            <Ionicons name="time-outline" size={13} color={Colors.textMuted} />
            <Text style={cardStyles.metaText}>{article.read_time_minutes} min de lecture</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={cardStyles.card}>
      <View style={[cardStyles.colorBar, { backgroundColor: color }]} />
      <View style={cardStyles.content}>
        <View style={[cardStyles.catBadge, { backgroundColor: color + '20', borderColor: color + '40' }]}>
          <Text style={[cardStyles.catText, { color }]}>{catLabel}</Text>
        </View>
        <Text style={cardStyles.title}>{article.title}</Text>
        <View style={cardStyles.metaRow}>
          <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
          <Text style={cardStyles.metaText}>{article.read_time_minutes} min</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

function ArticleDetail({ article, onBack }: { article: DocArticle; onBack: () => void }) {
  const color = CATEGORY_COLORS[article.category] ?? Colors.primary;
  const catLabel = CATEGORIES.find(c => c.key === article.category)?.label ?? '';

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <Text key={i} style={articleStyles.bold}>{line.slice(2, -2)}</Text>;
      }
      if (line.startsWith('- ')) {
        return (
          <View key={i} style={articleStyles.bulletRow}>
            <View style={[articleStyles.bullet, { backgroundColor: color }]} />
            <Text style={articleStyles.bulletText}>{line.slice(2)}</Text>
          </View>
        );
      }
      if (line.trim() === '') return <View key={i} style={articleStyles.spacer} />;
      return <Text key={i} style={articleStyles.paragraph}>{line}</Text>;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[color + '30', '#0D0D0D']} style={articleStyles.hero}>
          <TouchableOpacity onPress={onBack} style={articleStyles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={Colors.text} />
          </TouchableOpacity>
          <View style={[articleStyles.catBadge, { backgroundColor: color + '30', borderColor: color + '60' }]}>
            <Text style={[articleStyles.catText, { color }]}>{catLabel}</Text>
          </View>
          <Text style={articleStyles.title}>{article.title}</Text>
          <View style={articleStyles.metaRow}>
            <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
            <Text style={articleStyles.metaText}>{article.read_time_minutes} min de lecture</Text>
          </View>
        </LinearGradient>

        <View style={articleStyles.body}>
          {renderContent(article.content)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12 },
  title: { color: Colors.text, fontSize: 22, fontWeight: '800' },
  subtitle: { color: Colors.textSecondary, fontSize: 13, marginTop: 2 },
  catScroll: { marginBottom: 12 },
  catContainer: { paddingHorizontal: 20, gap: 8 },
  catChip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catText: { color: Colors.textSecondary, fontSize: 12, fontWeight: '500' },
  catTextActive: { color: '#fff', fontWeight: '700' },
  list: { paddingHorizontal: 20, paddingBottom: 100 },
});

const cardStyles = StyleSheet.create({
  featured: { borderRadius: 16, marginBottom: 12, overflow: 'hidden', borderWidth: 1, borderColor: Colors.border },
  featuredGradient: { padding: 20 },
  featuredTitle: { color: Colors.text, fontSize: 18, fontWeight: '800', marginBottom: 10 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: Colors.border, overflow: 'hidden' },
  colorBar: { width: 4, alignSelf: 'stretch' },
  content: { flex: 1, padding: 14 },
  catBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, marginBottom: 6 },
  catText: { fontSize: 11, fontWeight: '600' },
  title: { color: Colors.text, fontSize: 14, fontWeight: '700', marginBottom: 6 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: Colors.textMuted, fontSize: 11 },
});

const articleStyles = StyleSheet.create({
  hero: { paddingTop: 56, paddingBottom: 24, paddingHorizontal: 20 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  catBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, marginBottom: 10 },
  catText: { fontSize: 12, fontWeight: '600' },
  title: { color: Colors.text, fontSize: 22, fontWeight: '800', marginBottom: 10 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: Colors.textSecondary, fontSize: 13 },
  body: { padding: 20, paddingBottom: 80 },
  paragraph: { color: Colors.textSecondary, fontSize: 15, lineHeight: 24, marginBottom: 4 },
  bold: { color: Colors.text, fontSize: 15, fontWeight: '700', marginTop: 12, marginBottom: 4 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 4 },
  bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 9 },
  bulletText: { color: Colors.textSecondary, fontSize: 14, lineHeight: 22, flex: 1 },
  spacer: { height: 8 },
});
