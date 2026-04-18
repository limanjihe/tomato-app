import React, { useEffect, useRef, useState } from 'react'
import { ConfigProvider, Tabs, Badge, message } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import {
  ClockCircleOutlined,
  UnorderedListOutlined,
  BarChartOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons'
import TimerCircle from './components/TimerCircle'
import TimerControls from './components/TimerControls'
import TaskList from './components/TaskList'
import StatsView from './components/StatsView'
import { useTimerStore } from './store/useTimerStore'
import { useTaskStore } from './store/useTaskStore'
import { playFinishSound, initAudio } from './utils/audio'
import { getModeText } from './utils/time'

function App() {
  const {
    mode,
    status,
    timeLeft,
    decrementTime,
    finishTimer,
    currentTaskId,
  } = useTimerStore()
  const { addRecord, incrementTaskPomodoros, getTodayPomodoros } = useTaskStore()
  const [activeTab, setActiveTab] = useState('timer')

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const todayPomodoros = getTodayPomodoros()

  useEffect(() => {
    initAudio()
  }, [])

  useEffect(() => {
    if (status === 'running') {
      timerRef.current = setInterval(() => {
        decrementTime()
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [status, decrementTime])

  useEffect(() => {
    if (timeLeft === 0 && status === 'running') {
      finishTimer()
      playFinishSound()

      addRecord({
        taskId: currentTaskId || undefined,
        mode,
        duration: mode === 'work' ? 25 * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60,
      })

      if (mode === 'work' && currentTaskId) {
        incrementTaskPomodoros(currentTaskId)
      }

      message.success(`${getModeText(mode)}已完成！`)

      if (window.electronAPI) {
        window.electronAPI.showNotification(
          '番茄钟',
          `${getModeText(mode)}已完成！`
        )
      }
    }
  }, [
    timeLeft,
    status,
    mode,
    finishTimer,
    addRecord,
    currentTaskId,
    incrementTaskPomodoros,
  ])

  const tabItems = [
    {
      key: 'timer',
      label: (
        <Badge count={status === 'running' ? '●' : 0} size="small" color="#faad14">
          <ClockCircleOutlined /> 计时
        </Badge>
      ),
    },
    {
      key: 'tasks',
      label: (
        <Badge count={todayPomodoros} showZero color="#52c41a">
          <UnorderedListOutlined /> 任务
        </Badge>
      ),
    },
    {
      key: 'stats',
      label: (
        <>
          <BarChartOutlined /> 统计
        </>
      ),
    },
  ]

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#667eea',
        },
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          centered
          style={{ marginBottom: 16 }}
        />

        {activeTab === 'timer' && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
            }}
          >
            <TimerCircle />
            <TimerControls />
            {todayPomodoros > 0 && (
              <div style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>
                今日已完成 {todayPomodoros} 个番茄 🍅
              </div>
            )}
          </div>
        )}

        {activeTab === 'tasks' && (
          <div style={{ flex: 1, overflow: 'auto' }}>
            <TaskList />
            <div style={{ height: 16 }} />
            <TaskList showCompleted />
          </div>
        )}

        {activeTab === 'stats' && (
          <div style={{ flex: 1, overflow: 'auto' }}>
            <StatsView />
          </div>
        )}
      </div>
    </ConfigProvider>
  )
}

export default App
