export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function getProgress(timeLeft: number, totalTime: number): number {
  return ((totalTime - timeLeft) / totalTime) * 100
}

export function getModeText(mode: 'work' | 'shortBreak' | 'longBreak'): string {
  switch (mode) {
    case 'work':
      return '专注'
    case 'shortBreak':
      return '短休息'
    case 'longBreak':
      return '长休息'
    default:
      return '专注'
  }
}

export function getModeColor(mode: 'work' | 'shortBreak' | 'longBreak'): string {
  switch (mode) {
    case 'work':
      return '#ff6b6b'
    case 'shortBreak':
      return '#51cf66'
    case 'longBreak':
      return '#339af0'
    default:
      return '#ff6b6b'
  }
}
