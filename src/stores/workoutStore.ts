import { reactive, computed } from 'vue'
import type { Workout, BodyMeasurement, PR } from '../types'

const STORAGE_KEY = 'fitTrack_data'

interface StoreData {
  workouts: Workout[]
  measurements: BodyMeasurement[]
  prs: PR[]
}

const defaultData: StoreData = {
  workouts: [],
  measurements: [],
  prs: [],
}

function loadData(): StoreData {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try { return JSON.parse(raw) } catch { return defaultData }
  }
  return defaultData
}

function saveData(data: StoreData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

const data = reactive<StoreData>(loadData())

export const workoutStore = {
  workouts: computed(() => data.workouts),
  measurements: computed(() => data.measurements),
  prs: computed(() => data.prs),

  addWorkout(w: Workout) {
    data.workouts.push(w)
    saveData(data)
  },

  deleteWorkout(id: string) {
    data.workouts = data.workouts.filter(w => w.id !== id)
    saveData(data)
  },

  addMeasurement(m: BodyMeasurement) {
    data.measurements.push(m)
    saveData(data)
  },

  updatePR(pr: PR) {
    const existing = data.prs.findIndex(p => p.action === pr.action)
    if (existing >= 0) {
      data.prs[existing] = pr
    } else {
      data.prs.push(pr)
    }
    saveData(data)
  },

  clearAll() {
    data.workouts = []
    data.measurements = []
    data.prs = []
    saveData(data)
  },

  // 获取本周训练次数
  getThisWeekCount(): number {
    const now = new Date()
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay())
    return data.workouts.filter(w => new Date(w.date) >= weekStart).length
  },

  // 获取总训练次数
  getTotalCount(): number {
    return data.workouts.length
  },

  // 获取本周总时长
  getThisWeekDuration(): number {
    const now = new Date()
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay())
    return data.workouts
      .filter(w => new Date(w.date) >= weekStart)
      .reduce((sum, w) => sum + w.duration, 0)
  },

  // 获取本周总组数
  getThisWeekSets(): number {
    const now = new Date()
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay())
    return data.workouts
      .filter(w => new Date(w.date) >= weekStart)
      .reduce((sum, w) => sum + w.sets, 0)
  },
}