import React from 'react'
import { useTimerStore } from '@/store/useTimerStore'
import { formatTime, getProgress, getModeText, getModeColor } from '@/utils/time'

interface TimerCircleProps {
  size?: number
}

const TimerCircle: React.FC<TimerCircleProps> = ({ size = 280 }) => {
  const { mode, timeLeft, totalTime } = useTimerStore()

  const progress = getProgress(timeLeft, totalTime)
  const color = getModeColor(mode)
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="12"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '8px',
          }}
        >
          {getModeText(mode)}
        </div>
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: 'white',
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '2px',
          }}
        >
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  )
}

export default TimerCircle
