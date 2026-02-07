import { midiToNoteName } from './noteFrequencies.js'

export const CHORD_TYPES = {
  major:      { intervals: [0, 4, 7],     symbol: '',     label: 'Major' },
  minor:      { intervals: [0, 3, 7],     symbol: 'm',    label: 'Minor' },
  diminished: { intervals: [0, 3, 6],     symbol: 'dim',  label: 'Diminished' },
  augmented:  { intervals: [0, 4, 8],     symbol: 'aug',  label: 'Augmented' },
  dominant7:  { intervals: [0, 4, 7, 10], symbol: '7',    label: '7th' },
  major7:     { intervals: [0, 4, 7, 11], symbol: 'maj7', label: 'Major 7th' },
  minor7:     { intervals: [0, 3, 7, 10], symbol: 'm7',   label: 'Minor 7th' },
  sus2:       { intervals: [0, 2, 7],     symbol: 'sus2', label: 'Sus2' },
  sus4:       { intervals: [0, 5, 7],     symbol: 'sus4', label: 'Sus4' },
}

// Roots that prefer flat naming for their chord tones
const FLAT_ROOTS = new Set(['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'])

export const ROOT_NOTES = {
  'C':  60, 'C#': 61, 'Db': 61, 'D':  62, 'D#': 63, 'Eb': 63,
  'E':  64, 'F':  65, 'F#': 66, 'Gb': 66, 'G':  67, 'G#': 68,
  'Ab': 68, 'A':  69, 'A#': 70, 'Bb': 70, 'B':  71,
}

export function buildChord(rootName, chordType, baseOctave = 4) {
  const rootMidi = ROOT_NOTES[rootName] + (baseOctave - 4) * 12
  const typeInfo = CHORD_TYPES[chordType]
  const preferFlats = FLAT_ROOTS.has(rootName)

  const notes = typeInfo.intervals.map(interval => {
    const midi = rootMidi + interval
    const { name, octave } = midiToNoteName(midi, preferFlats)
    return { name, octave, midi }
  })

  const displayName = `${rootName} ${typeInfo.label}`
  const id = `${rootName}_${chordType}`

  return { id, root: rootName, type: chordType, displayName, notes }
}
