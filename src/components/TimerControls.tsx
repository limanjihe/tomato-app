import React from 'react'
import { Button, Space } from 'antd'
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
  ForwardOutlined,
} from '@ant-design/icons'
import { useTimerStore } from '@/store/useTimerStore'
import { TimerStatus } from '@/types'

interface TimerControlsProps {
  onStart?: () => void
  onPause?: () => void
  onReset?: () => void
  onSkip?: () => void
}

const TimerControls: React.FC<TimerControlsProps> = ({
  onStart,
  onPause,
  onReset,
  onSkip,
}) => {
  const { status, startTimer, pauseTimer, resetTimer, skipTimer } = useTimerStore()

  const handleStart = () => {
    startTimer()
    onStart?.()
  }

  const handlePause = () => {
    pauseTimer()
    onPause?.()
  }

  const handleReset = () => {
    resetTimer()
    onReset?.()
  }

  const handleSkip = () => {
    skipTimer()
    onSkip?.()
  }

  return (
    <Space size="middle">
      {status === 'running' ? (
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<PauseCircleOutlined />}
          onClick={handlePause}
          style={{ width: 64, height: 64, fontSize: 28 }}
        />
      ) : (
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={<PlayCircleOutlined />}
          onClick={handleStart}
          style={{ width: 64, height: 64, fontSize: 28 }}
        />
      )}
      <Button
        shape="circle"
        size="large"
        icon={<ReloadOutlined />}
        onClick={handleReset}
        style={{ width: 48, height: 48 }}
      />
      <Button
        shape="circle"
        size="large"
        icon={<ForwardOutlined />}
        onClick={handleSkip}
        style={{ width: 48, height: 48 }}
      />
    </Space>
  )
}

export default TimerControls
