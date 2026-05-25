# CoachPro - Guide de démarrage

## Structure du projet

```
CoachingApp/
├── app/
│   ├── (auth)/           ← Écrans connexion / inscription
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/           ← Les 5 onglets principaux
│   │   ├── index.tsx         → Entraînements
│   │   ├── nutrition.tsx     → Nutrition
│   │   ├── bilans.tsx        → Bilans coach
│   │   ├── documentation.tsx → Documentation musculation
│   │   └── profil.tsx        → Profil utilisateur
│   └── _layout.tsx       ← Navigation principale + auth guard
├── components/           ← Composants réutilisables
├── constants/Colors.ts   ← Palette de couleurs
├── hooks/useAuth.ts      ← Gestion authentification
├── lib/supabase.ts       ← Client Supabase
├── types/index.ts        ← Types TypeScript
└── supabase_schema.sql   ← Schéma base de données
```

## Étape 1 : Installer les dépendances

```bash
cd CoachingApp
npm install
```

## Étape 2 : Configurer Supabase

1. Créez un compte sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Dans **SQL Editor**, copiez-collez le contenu de `supabase_schema.sql` et exécutez
4. Dans **Settings > API**, copiez :
   - `Project URL`
   - `anon public key`

5. Créez le fichier `.env` à la racine :
```
EXPO_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon
```

## Étape 3 : Lancer l'application

```bash
npx expo start
```

Puis :
- **Sur votre téléphone** : installez l'app Expo Go, scannez le QR code
- **Émulateur Android** : appuyez sur `a`
- **Simulateur iOS** (Mac uniquement) : appuyez sur `i`

## Onglets de l'application

| Onglet | Description |
|--------|-------------|
| **Entraînements** | Liste des séances, filtre, détail avec tous les exercices |
| **Nutrition** | Plan alimentaire du jour, macros en temps réel, détail des repas |
| **Bilans** | Envoi de bilan hebdomadaire au coach, historique, réponses coach |
| **Documentation** | Articles par catégorie (technique, nutrition, récupération, mental) |
| **Profil** | Stats, progression poids, paramètres, déconnexion |

## Pour aller plus loin

- Activer les **notifications push** avec `expo-notifications`
- Ajouter un **calendrier** de séances avec `react-native-calendars`
- Intégrer la **caméra** pour les photos de progression avec `expo-image-picker`
- Ajouter un **timer** de repos entre les exercices
- Créer une **interface coach** pour assigner des programmes
