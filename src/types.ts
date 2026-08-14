export interface Workout {
  id: string
  action: string
  bodyPart: string
  sets: number
  reps: number
  weight: number
  duration: number
  date: string
  note?: string
}

export interface BodyMeasurement {
  date: string
  weight: number
  chest?: number
  waist?: number
  arm?: number
  thigh?: number
  bodyFat?: number
}

export interface PR {
  action: string
  weight: number
  date: string
}

export interface NutritionTarget {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export interface Meal {
  name: string
  foods: string[]
}

export interface DietPlan {
  dayType: 'training' | 'rest'
  meals: Meal[]
  target: NutritionTarget
}