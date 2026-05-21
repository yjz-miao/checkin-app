import type { WeightRecord, CalorieRecord, StudyProfile, StudyRecord, AppSettings } from '../types'

function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function set<T>(key: string, val: T) {
  localStorage.setItem(key, JSON.stringify(val))
}

// ─── Weight ───
const WEIGHT_KEY = 'checkin_weights'
export function getWeights(): WeightRecord[] { return get<WeightRecord[]>(WEIGHT_KEY, []) }
export function saveWeight(r: WeightRecord) { const list = getWeights(); list.push(r); set(WEIGHT_KEY, list) }
export function deleteWeight(id: string) { set(WEIGHT_KEY, getWeights().filter(r => r.id !== id)) }

// ─── Calories ───
const CAL_KEY = 'checkin_calories'
export function getCalories(): CalorieRecord[] { return get<CalorieRecord[]>(CAL_KEY, []) }
export function saveCalorie(r: CalorieRecord) { const list = getCalories(); list.push(r); set(CAL_KEY, list) }
export function deleteCalorie(id: string) { set(CAL_KEY, getCalories().filter(r => r.id !== id)) }

// ─── Study Profiles ───
const PROFILE_KEY = 'checkin_profiles'
export function getProfiles(): StudyProfile[] {
  const defaults: StudyProfile[] = [
    { id: 'p1', name: '小可爱', emoji: '🐰', color: '#FFB6C1' },
    { id: 'p2', name: '小宝贝', emoji: '🐻', color: '#80DEEA' },
  ]
  const saved = get<StudyProfile[]>(PROFILE_KEY, [])
  return saved.length ? saved : defaults
}
export function saveProfiles(list: StudyProfile[]) { set(PROFILE_KEY, list) }

// ─── Study Records ───
const STUDY_KEY = 'checkin_study'
export function getStudyRecords(): StudyRecord[] { return get<StudyRecord[]>(STUDY_KEY, []) }
export function saveStudyRecord(r: StudyRecord) { const list = getStudyRecords(); list.push(r); set(STUDY_KEY, list) }
export function deleteStudyRecord(id: string) { set(STUDY_KEY, getStudyRecords().filter(r => r.id !== id)) }

// ─── Settings ───
const SETTINGS_KEY = 'checkin_settings'
const defaultSettings: AppSettings = {
  reminderEnabled: false,
  reminderTime: '20:00',
}
export function getSettings(): AppSettings { return { ...defaultSettings, ...get<Partial<AppSettings>>(SETTINGS_KEY, {}) } }
export function saveSettings(s: AppSettings) { set(SETTINGS_KEY, s) }
