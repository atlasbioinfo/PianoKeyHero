<template>
  <Transition name="feedback">
    <div v-if="visible" class="overlay" :class="isCorrect ? 'correct' : 'wrong'">
      <div class="feedback-card animate-bounce-in">
        <div class="feedback-icon">{{ isCorrect ? '🎉' : '😊' }}</div>
        <div class="feedback-text">
          {{ isCorrect ? messages.correct : messages.wrong }}
        </div>
        <div v-if="!isCorrect && correctAnswer" class="correct-answer">
          The answer was: <strong>{{ correctAnswer }}</strong>
        </div>
        <div v-if="isCorrect && coinsEarned" class="coins-earned">
          +{{ coinsEarned }} coins!
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  visible: { type: Boolean, default: false },
  isCorrect: { type: Boolean, default: false },
  correctAnswer: { type: String, default: '' },
  coinsEarned: { type: Number, default: 0 },
})

const correctMessages = [
  'Amazing!', 'Great job!', 'You got it!', 'Perfect!',
  'Wonderful!', 'Awesome!', 'Brilliant!', 'Super!',
]
const wrongMessages = [
  'Nice try!', 'Almost there!', 'Keep going!',
  'You can do it!', "Don't give up!", 'Try again!',
]

const messages = computed(() => ({
  correct: correctMessages[Math.floor(Math.random() * correctMessages.length)],
  wrong: wrongMessages[Math.floor(Math.random() * wrongMessages.length)],
}))
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.overlay.correct {
  background: rgba(76, 175, 80, 0.15);
}

.overlay.wrong {
  background: rgba(255, 107, 107, 0.15);
}

.feedback-card {
  background: var(--color-white);
  border-radius: var(--radius-lg);
  padding: 32px 40px;
  text-align: center;
  box-shadow: var(--shadow-lg);
  max-width: 320px;
}

.feedback-icon {
  font-size: 56px;
  margin-bottom: 12px;
}

.feedback-text {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 8px;
}

.correct-answer {
  font-size: 16px;
  color: var(--color-text-light);
  margin-top: 8px;
}

.coins-earned {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-coin);
  margin-top: 8px;
}

.feedback-enter-active { transition: opacity 0.2s; }
.feedback-leave-active { transition: opacity 0.3s; }
.feedback-enter-from,
.feedback-leave-to { opacity: 0; }
</style>
