<template>
  <div class="app">
    <GameHeader
      :coins="state.coins"
      :streak="state.currentStreak"
      :level-name="state.currentScreen === 'game' ? currentLevelConfig?.name : ''"
      :show-back="state.currentScreen !== 'home'"
      @back="handleBack"
    />

    <main class="main-content">
      <HomeScreen
        v-if="state.currentScreen === 'home'"
        :unlocked-levels="state.unlockedLevels"
        :level-scores="state.levelScores"
        @start-level="startLevel"
      />

      <GameScreen
        v-else-if="state.currentScreen === 'game'"
        :key="gameKey"
        :game-state="state"
        :level-config="currentLevelConfig"
        :total-questions="totalQuestions"
        @correct="handleCorrect"
        @wrong="handleWrong"
        @round-end="endRound"
      />

      <ResultScreen
        v-else-if="state.currentScreen === 'result'"
        :correct-answers="state.correctAnswers"
        :wrong-answers="state.wrongAnswers"
        :total-questions="totalQuestions"
        :passing-score="currentLevelConfig?.passingScore || 7"
        :level-id="state.currentLevel"
        :already-unlocked="state.unlockedLevels.includes(state.currentLevel + 1)"
        @retry="retryLevel"
        @home="goHome"
      />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useGameState } from '@/composables/useGameState.js'
import GameHeader from '@/components/layout/GameHeader.vue'
import HomeScreen from '@/components/screens/HomeScreen.vue'
import GameScreen from '@/components/game/GameScreen.vue'
import ResultScreen from '@/components/screens/ResultScreen.vue'

const {
  state,
  currentLevelConfig,
  totalQuestions,
  startLevel,
  recordCorrectAnswer,
  recordWrongAnswer,
  endRound,
  goHome,
} = useGameState()

const gameKey = ref(0)

function handleCorrect() {
  return recordCorrectAnswer()
}

function handleWrong() {
  recordWrongAnswer()
}

function retryLevel() {
  startLevel(state.currentLevel)
  gameKey.value++
}

function handleBack() {
  goHome()
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
