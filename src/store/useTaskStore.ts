import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Task, PomodoroRecord } from '@/types'

interface TaskState {
  tasks: Task[]
  records: PomodoroRecord[]
  addTask: (task: Omit<Task, 'id' | 'completedPomodoros' | 'completed' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  toggleTaskComplete: (id: string) => void
  incrementTaskPomodoros: (id: string) => void
  addRecord: (record: Omit<PomodoroRecord, 'id' | 'completedAt'>) => void
  getTodayRecords: () => PomodoroRecord[]
  getTodayPomodoros: () => number
  getWeeklyStats: () => { date: string; count: number }[]
  clearAllData: () => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      records: [],

      addTask: (task) => {
        const newTask: Task = {
          ...task,
          id: Date.now().toString(),
          completedPomodoros: 0,
          completed: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
        set((state) => ({ tasks: [newTask, ...state.tasks] }))
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates, updatedAt: Date.now() } : task
          ),
        }))
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }))
      },

      toggleTaskComplete: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, completed: !task.completed, updatedAt: Date.now() }
              : task
          ),
        }))
      },

      incrementTaskPomodoros: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  completedPomodoros: task.completedPomodoros + 1,
                  updatedAt: Date.now(),
                }
              : task
          ),
        }))
      },

      addRecord: (record) => {
        const newRecord: PomodoroRecord = {
          ...record,
          id: Date.now().toString(),
          completedAt: Date.now(),
        }
        set((state) => ({ records: [...state.records, newRecord] }))
      },

      getTodayRecords: () => {
        const today = new Date().toDateString()
        return get().records.filter(
          (record) => new Date(record.completedAt).toDateString() === today
        )
      },

      getTodayPomodoros: () => {
        return get().getTodayRecords().filter((r) => r.mode === 'work').length
      },

      getWeeklyStats: () => {
        const stats: { [key: string]: number } = {}
        const now = new Date()

        for (let i = 6; i >= 0; i--) {
          const date = new Date(now)
          date.setDate(date.getDate() - i)
          const dateStr = date.toDateString()
          stats[dateStr] = 0
        }

        get().records.forEach((record) => {
          if (record.mode === 'work') {
            const dateStr = new Date(record.completedAt).toDateString()
            if (stats[dateStr] !== undefined) {
              stats[dateStr]++
            }
          }
        })

        return Object.entries(stats).map(([dateStr, count]) => {
          const date = new Date(dateStr)
          const weekDay = ['日', '一', '二', '三', '四', '五', '六'][date.getDay()]
          return { date: `周${weekDay}`, count }
        })
      },

      clearAllData: () => {
        set({ tasks: [], records: [] })
      },
    }),
    {
      name: 'tomato-task-storage',
    }
  )
)
