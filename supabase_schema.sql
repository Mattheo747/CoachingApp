-- ============================================================
-- CoachPro - Schéma Supabase
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase
-- ============================================================

-- Table des profils utilisateurs (complète auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'athlete' CHECK (role IN ('athlete', 'coach')),
  coach_id UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger pour créer automatiquement un profil à l'inscription
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Utilisateur'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Table des entraînements
CREATE TABLE IF NOT EXISTS workouts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Débutant', 'Intermédiaire', 'Avancé')),
  muscle_groups TEXT[] DEFAULT '{}',
  exercises JSONB DEFAULT '[]',
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  scheduled_date TIMESTAMPTZ,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des plans nutritionnels
CREATE TABLE IF NOT EXISTS meal_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  total_calories INTEGER,
  total_protein INTEGER,
  total_carbs INTEGER,
  total_fat INTEGER,
  meals JSONB DEFAULT '[]',
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des bilans
CREATE TABLE IF NOT EXISTS bilans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  coach_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  weight NUMERIC(5,2),
  body_fat NUMERIC(4,2),
  notes_athlete TEXT NOT NULL,
  notes_coach TEXT,
  photos TEXT[] DEFAULT '{}',
  measurements JSONB,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des articles de documentation
CREATE TABLE IF NOT EXISTS doc_articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('technique', 'nutrition', 'recuperation', 'mental')),
  content TEXT NOT NULL,
  image_url TEXT,
  read_time_minutes INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE bilans ENABLE ROW LEVEL SECURITY;
ALTER TABLE doc_articles ENABLE ROW LEVEL SECURITY;

-- Profils : chacun voit son profil + coach voit ses athlètes
CREATE POLICY "profiles_select" ON profiles FOR SELECT
  USING (id = auth.uid() OR coach_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'coach'));

CREATE POLICY "profiles_update" ON profiles FOR UPDATE
  USING (id = auth.uid());

-- Entraînements : créateur ou assigné peut voir
CREATE POLICY "workouts_select" ON workouts FOR SELECT
  USING (created_by = auth.uid() OR assigned_to = auth.uid());

CREATE POLICY "workouts_insert" ON workouts FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "workouts_update" ON workouts FOR UPDATE
  USING (created_by = auth.uid() OR assigned_to = auth.uid());

-- Plans nutritionnels : même logique
CREATE POLICY "meal_plans_select" ON meal_plans FOR SELECT
  USING (created_by = auth.uid() OR assigned_to = auth.uid());

CREATE POLICY "meal_plans_insert" ON meal_plans FOR INSERT
  WITH CHECK (created_by = auth.uid());

-- Bilans : athlète (créateur) et coach peuvent voir
CREATE POLICY "bilans_select" ON bilans FOR SELECT
  USING (user_id = auth.uid() OR coach_id = auth.uid());

CREATE POLICY "bilans_insert" ON bilans FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "bilans_update" ON bilans FOR UPDATE
  USING (user_id = auth.uid() OR coach_id = auth.uid());

-- Documentation : tout le monde authentifié peut lire
CREATE POLICY "doc_articles_select" ON doc_articles FOR SELECT
  TO authenticated USING (TRUE);
