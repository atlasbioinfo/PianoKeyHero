const STORAGE_KEY = 'piano-chord-game-progress'

export function useProgress() {
  function saveProgress(data) {
    const payload = {
      coins: data.coins,
      bestStreak: data.bestStreak,
      levelScores: data.levelScores,
      unlockedLevels: data.unlockedLevels,
      savedAt: Date.now(),
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // localStorage full or unavailable — silently ignore
    }
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      return JSON.parse(raw)
    } catch {
      return null
    }
  }

  function resetProgress() {
    localStorage.removeItem(STORAGE_KEY)
  }

  return { saveProgress, loadProgress, resetProgress }
}
