import { ref } from 'vue'
import { buildChord } from '@/data/chords.js'
import { shuffleArray } from '@/utils/chordUtils.js'

export function useChordQuiz(levelConfig) {
  const currentChord = ref(null)
  const options = ref([])
  const isAnswered = ref(false)
  const lastAnswerCorrect = ref(false)
  const correctAnswer = ref('')

  // Track recent chords to avoid immediate repeats
  const recentChords = []

  function generateQuestion() {
    const pool = levelConfig.value.chords
    // Filter out recently shown chords
    let available = pool.filter(
      c => !recentChords.includes(`${c.root}_${c.type}`)
    )
    if (available.length < 1) {
      available = pool
      recentChords.length = 0
    }

    // Pick random chord
    const pick = available[Math.floor(Math.random() * available.length)]
    const chord = buildChord(pick.root, pick.type)

    // Track it
    recentChords.push(chord.id)
    if (recentChords.length > 3) recentChords.shift()

    currentChord.value = chord
    correctAnswer.value = chord.displayName
    isAnswered.value = false
    lastAnswerCorrect.value = false

    // Generate distractors
    const distractors = generateDistractors(chord, pool)
    options.value = shuffleArray([chord.displayName, ...distractors])
  }

  function generateDistractors(correct, pool) {
    const candidates = []

    // Prioritize: same root different type
    pool.forEach(c => {
      if (c.root === correct.root && c.type !== correct.type) {
        const built = buildChord(c.root, c.type)
        candidates.push({ name: built.displayName, priority: 1 })
      }
    })

    // Then: different root same type
    pool.forEach(c => {
      if (c.root !== correct.root && c.type === correct.type) {
        const built = buildChord(c.root, c.type)
        if (!candidates.find(d => d.name === built.displayName)) {
          candidates.push({ name: built.displayName, priority: 2 })
        }
      }
    })

    // Then: everything else
    pool.forEach(c => {
      if (c.root !== correct.root || c.type !== correct.type) {
        const built = buildChord(c.root, c.type)
        if (!candidates.find(d => d.name === built.displayName)) {
          candidates.push({ name: built.displayName, priority: 3 })
        }
      }
    })

    // Sort by priority, pick up to 3
    candidates.sort((a, b) => a.priority - b.priority)
    const picked = candidates.slice(0, 3).map(c => c.name)

    // If we still don't have 3, add generic ones
    const fallbacks = ['C Major', 'A Minor', 'G Major', 'D Minor', 'E Minor', 'F Major']
    for (const fb of fallbacks) {
      if (picked.length >= 3) break
      if (fb !== correct.displayName && !picked.includes(fb)) {
        picked.push(fb)
      }
    }

    return picked.slice(0, 3)
  }

  function checkAnswer(selected) {
    isAnswered.value = true
    lastAnswerCorrect.value = selected === correctAnswer.value
    return lastAnswerCorrect.value
  }

  function reset() {
    currentChord.value = null
    options.value = []
    isAnswered.value = false
    lastAnswerCorrect.value = false
    recentChords.length = 0
  }

  return {
    currentChord,
    options,
    isAnswered,
    lastAnswerCorrect,
    correctAnswer,
    generateQuestion,
    checkAnswer,
    reset,
  }
}
