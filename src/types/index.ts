export type TimerMode = 'work' | 'shortBreak' | 'longBreak'

export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished'

export interface Task {
  id: string
  title: string
  description?: string
  estimatedPomodoros: number
  completedPomodoros: number
  completed: boolean
  createdAt: number
  updatedAt: number
}

export interface PomodoroRecord {
  id: string
  taskId?: string
  mode: TimerMode
  duration: number
  completedAt: number
}

export interface Settings {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  longBreakInterval: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  enableNotifications: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  workDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  longBreakInterval: 4,
  autoStartBreaks: true,
  autoStartPomodoros: false,
  enableNotifications: true,
}
