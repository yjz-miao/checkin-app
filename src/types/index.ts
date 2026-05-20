export interface WeightRecord {
  id: string
  date: string // YYYY-MM-DD
  weight: number // kg
}

export interface CalorieRecord {
  id: string
  date: string
  time: string // HH:mm
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  foodName: string
  calories: number
  imageUrl?: string
}

export interface StudyProfile {
  id: string
  name: string
  emoji: string
  color: string
}

export interface StudyRecord {
  id: string
  date: string
  profileId: string
  duration: number
  wordCount: number
}

export interface AppSettings {
  nutritionixAppId: string
  nutritionixApiKey: string
  reminderEnabled: boolean
  reminderTime: string
}
