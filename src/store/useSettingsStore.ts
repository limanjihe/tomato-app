import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Settings, DEFAULT_SETTINGS } from '@/types'

interface SettingsState extends Settings {
  setWorkDuration: (minutes: number) => void
  setShortBreakDuration: (minutes: number) => void
  setLongBreakDuration: (minutes: number) => void
  setLongBreakInterval: (count: number) => void
  setAutoStartBreaks: (enabled: boolean) => void
  setAutoStartPomodoros: (enabled: boolean) => void
  setEnableNotifications: (enabled: boolean) => void
  resetSettings: () => void
  getDuration: (mode: 'work' | 'shortBreak' | 'longBreak') => number
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_SETTINGS,

      setWorkDuration: (minutes) => set({ workDuration: minutes * 60 }),
      setShortBreakDuration: (minutes) => set({ shortBreakDuration: minutes * 60 }),
      setLongBreakDuration: (minutes) => set({ longBreakDuration: minutes * 60 }),
      setLongBreakInterval: (count) => set({ longBreakInterval: count }),
      setAutoStartBreaks: (enabled) => set({ autoStartBreaks: enabled }),
      setAutoStartPomodoros: (enabled) => set({ autoStartPomodoros: enabled }),
      setEnableNotifications: (enabled) => set({ enableNotifications: enabled }),

      resetSettings: () => set(DEFAULT_SETTINGS),

      getDuration: (mode) => {
        const state = get()
        switch (mode) {
          case 'work':
            return state.workDuration
          case 'shortBreak':
            return state.shortBreakDuration
          case 'longBreak':
            return state.longBreakDuration
          default:
            return 25 * 60
        }
      },
    }),
    {
      name: 'tomato-settings-storage',
    }
  )
)
