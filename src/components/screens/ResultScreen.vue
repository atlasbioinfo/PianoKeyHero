<template>
  <div class="result-screen container">
    <div class="result-card animate-bounce-in">
      <div class="result-icon">{{ passed ? '🏆' : '💪' }}</div>
      <h2 class="result-title">
        {{ passed ? 'Level Complete!' : 'Keep Practicing!' }}
      </h2>

      <div class="stats">
        <div class="stat">
          <div class="stat-value correct-color">{{ correctAnswers }}</div>
          <div class="stat-label">Correct</div>
        </div>
        <div class="stat">
          <div class="stat-value wrong-color">{{ wrongAnswers }}</div>
          <div class="stat-label">Wrong</div>
        </div>
        <div class="stat">
          <div class="stat-value">{{ totalQuestions }}</div>
          <div class="stat-label">Total</div>
        </div>
      </div>

      <div class="score-bar">
        <ProgressBar
          :percent="scorePercent"
          :color="passed ? 'var(--color-correct)' : 'var(--color-wrong)'"
          :show-label="true"
        />
      </div>

      <div v-if="passed && !alreadyUnlocked" class="unlock-message animate-slide-up">
        🎉 Level {{ levelId + 1 }} Unlocked!
      </div>

      <div v-if="isPerfect" class="perfect-message animate-pulse">
        ⭐ Perfect Score! +{{ 50 * levelId }} bonus coins!
      </div>

      <div class="actions">
        <button class="btn btn-primary" @click="$emit('retry')">
          Play Again
        </button>
        <button class="btn btn-secondary" @click="$emit('home')">
          Level Select
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ProgressBar from '@/components/progress/ProgressBar.vue'

const props = defineProps({
  correctAnswers: { type: Number, default: 0 },
  wrongAnswers: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 10 },
  passingScore: { type: Number, default: 7 },
  levelId: { type: Number, default: 1 },
  alreadyUnlocked: { type: Boolean, default: false },
})

defineEmits(['retry', 'home'])

const passed = computed(() => props.correctAnswers >= props.passingScore)
const isPerfect = computed(() => props.wrongAnswers === 0)
const scorePercent = computed(() =>
  Math.round((props.correctAnswers / props.totalQuestions) * 100)
)
</script>

<style scoped>
.result-screen {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
}

.result-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 36px 32px;
  text-align: center;
  box-shadow: var(--shadow-lg);
  max-width: 420px;
  width: 100%;
}

.result-icon {
  font-size: 64px;
  margin-bottom: 12px;
}

.result-title {
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 20px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 20px;
}

.stat-value {
  font-size: 36px;
  font-weight: 800;
}

.stat-label {
  font-size: 13px;
  color: var(--color-text-light);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.correct-color { color: var(--color-correct); }
.wrong-color { color: var(--color-wrong); }

.score-bar {
  margin: 0 20px 16px;
}

.unlock-message {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  margin: 16px 0;
}

.perfect-message {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-coin);
  margin: 12px 0;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
}

.btn {
  padding: 14px 28px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: var(--shadow);
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background: #3a7bc8;
}

.btn-secondary {
  background: #f0f0f0;
  color: var(--color-text);
}

.btn-secondary:hover {
  background: #e0e0e0;
}
</style>
