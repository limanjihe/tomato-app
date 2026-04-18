let audioContext: AudioContext | null = null

export function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
}

export function playBeep(frequency = 800, duration = 200, type: OscillatorType = 'sine') {
  if (!audioContext) {
    initAudio()
  }

  if (!audioContext) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = frequency
  oscillator.type = type

  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration / 1000)
}

export function playFinishSound() {
  playBeep(800, 150)
  setTimeout(() => playBeep(1000, 150), 200)
  setTimeout(() => playBeep(1200, 300), 400)
}

export function playTickSound() {
  playBeep(600, 50, 'square')
}
