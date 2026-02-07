import { midiToFrequency } from '@/data/noteFrequencies.js'

let audioContext = null

function getContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
  return audioContext
}

export function useAudio() {
  function playChord(notes, duration = 1.5) {
    const ctx = getContext()
    const now = ctx.currentTime
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.25, now)
    master.connect(ctx.destination)

    notes.forEach(note => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(midiToFrequency(note.midi), now)

      // ADSR envelope
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(0.35, now + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.3)
      gain.gain.setValueAtTime(0.18, now + duration - 0.3)
      gain.gain.linearRampToValueAtTime(0.001, now + duration)

      osc.connect(gain)
      gain.connect(master)
      osc.start(now)
      osc.stop(now + duration)
    })
  }

  function playCorrectSound() {
    const ctx = getContext()
    const now = ctx.currentTime
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.2, now)
    master.connect(ctx.destination)

    // Two ascending notes
    ;[523.25, 659.25].forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)
      gain.gain.setValueAtTime(0, now + i * 0.12)
      gain.gain.linearRampToValueAtTime(0.3, now + i * 0.12 + 0.02)
      gain.gain.linearRampToValueAtTime(0.001, now + i * 0.12 + 0.3)
      osc.connect(gain)
      gain.connect(master)
      osc.start(now + i * 0.12)
      osc.stop(now + i * 0.12 + 0.35)
    })
  }

  function playWrongSound() {
    const ctx = getContext()
    const now = ctx.currentTime
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.15, now)
    master.connect(ctx.destination)

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(220, now)
    osc.frequency.linearRampToValueAtTime(180, now + 0.3)
    gain.gain.setValueAtTime(0.25, now)
    gain.gain.linearRampToValueAtTime(0.001, now + 0.4)
    osc.connect(gain)
    gain.connect(master)
    osc.start(now)
    osc.stop(now + 0.45)
  }

  return { playChord, playCorrectSound, playWrongSound }
}
