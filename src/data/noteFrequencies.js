const NOTE_NAMES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const NOTE_NAMES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

export function midiToFrequency(midiNote) {
  return 440 * Math.pow(2, (midiNote - 69) / 12)
}

export function midiToNoteName(midi, preferFlats = false) {
  const names = preferFlats ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP
  const octave = Math.floor(midi / 12) - 1
  const noteIndex = midi % 12
  return { name: names[noteIndex], octave }
}
