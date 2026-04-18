import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TimerMode, TimerStatus } from '@/types'

interface TimerState {
  mode: TimerMode
  status: TimerStatus
  timeLeft: number
  totalTime: number
  consecutivePomodoros: number
  currentTaskId: string | null
  setMode: (mode: TimerMode) => void
  setStatus: (status: TimerStatus) => void
  setTimeLeft: (time: number) => void
  setTotalTime: (time: number) => void
  decrementTime: () => void
  resetTimer: () => void
  startTimer: () => void
  pauseTimer: () => void
  finishTimer: () => void
  skipTimer: () => void
  setCurrentTaskId: (taskId: string | null) => void
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      mode: 'work',
      status: 'idle',
      timeLeft: 25 * 60,
      totalTime: 25 * 60,
      consecutivePomodoros: 0,
      currentTaskId: null,

      setMode: (mode) => set({ mode }),
      setStatus: (status) => set({ status }),
      setTimeLeft: (time) => set({ timeLeft: time }),
      setTotalTime: (time) => set({ totalTime: time }),

      decrementTime: () => {
        const { timeLeft } = get()
        if (timeLeft > 0) {
          set({ timeLeft: timeLeft - 1 })
        }
      },

      resetTimer: () => {
        const { mode } = get()
        const settings = useTimerStore.getState()
        let duration = 25 * 60

        if (mode === 'shortBreak') duration = 5 * 60
        if (mode === 'longBreak') duration = 15 * 60

        set({
          status: 'idle',
          timeLeft: duration,
          totalTime: duration,
        })
      },

      startTimer: () => set({ status: 'running' }),
      pauseTimer: () => set({ status: 'paused' }),

      finishTimer: () => {
        const { mode, consecutivePomodoros } = get()

        if (mode === 'work') {
          const newConsecutive = consecutivePomodoros + 1
          const nextMode: TimerMode =
            newConsecutive % 4 === 0 ? 'longBreak' : 'shortBreak'

          set({
            status: 'finished',
            consecutivePomodoros: newConsecutive,
            mode: nextMode,
            timeLeft: nextMode === 'longBreak' ? 15 * 60 : 5 * 60,
            totalTime: nextMode === 'longBreak' ? 15 * 60 : 5 * 60,
          })
        } else {
          set({
            status: 'finished',
            mode: 'work',
            timeLeft: 25 * 60,
            totalTime: 25 * 60,
          })
        }
      },

      skipTimer: () => {
        const { mode, consecutivePomodoros } = get()

        if (mode === 'work') {
          const nextMode: TimerMode =
            (consecutivePomodoros + 1) % 4 === 0 ? 'longBreak' : 'shortBreak'
          set({
            mode: nextMode,
            status: 'idle',
            timeLeft: nextMode === 'longBreak' ? 15 * 60 : 5 * 60,
            totalTime: nextMode === 'longBreak' ? 15 * 60 : 5 * 60,
          })
        } else {
          set({
            mode: 'work',
            status: 'idle',
            timeLeft: 25 * 60,
            totalTime: 25 * 60,
          })
        }
      },

      setCurrentTaskId: (taskId) => set({ currentTaskId: taskId }),
    }),
    {
      name: 'tomato-timer-storage',
      partialize: (state) => ({
        consecutivePomodoros: state.consecutivePomodoros,
      }),
    }
  )
)
