export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'athlete' | 'coach';
  created_at: string;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  muscle_groups: string[];
  exercises: Exercise[];
  created_by: string;
  assigned_to?: string;
  scheduled_date?: string;
  completed: boolean;
  created_at: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest_seconds: number;
  notes?: string;
  video_url?: string;
}

export interface MealPlan {
  id: string;
  title: string;
  date: string;
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
  meals: Meal[];
  created_by: string;
  assigned_to?: string;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  foods: Food[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Food {
  name: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Bilan {
  id: string;
  user_id: string;
  coach_id: string;
  date: string;
  weight?: number;
  body_fat?: number;
  notes_athlete: string;
  notes_coach?: string;
  photos?: string[];
  measurements?: Measurements;
  status: 'pending' | 'reviewed';
  created_at: string;
}

export interface Measurements {
  chest?: number;
  waist?: number;
  hips?: number;
  bicep?: number;
  thigh?: number;
}

export interface DocArticle {
  id: string;
  title: string;
  category: 'technique' | 'nutrition' | 'recuperation' | 'mental';
  content: string;
  image_url?: string;
  read_time_minutes: number;
  created_at: string;
}
