import { reactive, computed } from 'vue'
import { LEVELS } from '@/data/levels.js'
import { useProgress } from './useProgress.js'

export function useGameState() {
  const { saveProgress, loadProgress } = useProgress()

  const state = reactive({
    currentScreen: 'home',  // 'home' | 'game' | 'result'
    currentLevel: 1,
    coins: 0,
    currentStreak: 0,
    bestStreak: 0,
    currentQuestion: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    levelScores: {},       // { levelId: bestScore }
    unlockedLevels: [1],
  })

  // Restore saved progress
  const saved = loadProgress()
  if (saved) {
    state.coins = saved.coins || 0
    state.bestStreak = saved.bestStreak || 0
    state.levelScores = saved.levelScores || {}
    state.unlockedLevels = saved.unlockedLevels || [1]
  }

  const currentLevelConfig = computed(() =>
    LEVELS.find(l => l.id === state.currentLevel)
  )

  const totalQuestions = computed(() =>
    currentLevelConfig.value?.questionsPerRound || 10
  )

  function startLevel(levelId) {
    state.currentLevel = levelId
    state.currentQuestion = 0
    state.correctAnswers = 0
    state.wrongAnswers = 0
    state.currentStreak = 0
    state.currentScreen = 'game'
  }

  function recordCorrectAnswer() {
    const cfg = currentLevelConfig.value
    state.correctAnswers++
    state.currentQuestion++
    state.currentStreak++

    // Coins
    let earned = cfg.coinsPerCorrect
    if (state.currentStreak > 0 && state.currentStreak % 3 === 0) {
      earned += cfg.streakBonus
    }
    state.coins += earned

    // Best streak
    if (state.currentStreak > state.bestStreak) {
      state.bestStreak = state.currentStreak
    }

    persist()
    return earned
  }

  function recordWrongAnswer() {
    state.wrongAnswers++
    state.currentQuestion++
    state.currentStreak = 0
  }

  function endRound() {
    const levelId = state.currentLevel
    const score = state.correctAnswers

    // Update best score
    if (!state.levelScores[levelId] || score > state.levelScores[levelId]) {
      state.levelScores[levelId] = score
    }

    // Perfect round bonus
    if (state.wrongAnswers === 0) {
      const bonus = 50 * levelId
      state.coins += bonus
    }

    // Unlock next level
    const cfg = currentLevelConfig.value
    const nextLevel = LEVELS.find(l => l.id === levelId + 1)
    if (nextLevel && score >= cfg.passingScore && !state.unlockedLevels.includes(levelId + 1)) {
      state.unlockedLevels.push(levelId + 1)
    }

    persist()
    state.currentScreen = 'result'
  }

  function goHome() {
    state.currentScreen = 'home'
  }

  function persist() {
    saveProgress({
      coins: state.coins,
      bestStreak: state.bestStreak,
      levelScores: state.levelScores,
      unlockedLevels: state.unlockedLevels,
    })
  }

  return {
    state,
    currentLevelConfig,
    totalQuestions,
    startLevel,
    recordCorrectAnswer,
    recordWrongAnswer,
    endRound,
    goHome,
  }
}
