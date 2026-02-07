<template>
  <div class="game-screen">
    <div class="question-info">
      Question {{ gameState.currentQuestion + 1 }} of {{ totalQuestions }}
    </div>

    <StaffDisplay :chord="currentChord" />

    <div class="play-area">
      <PlayChordButton :chord="currentChord" />
    </div>

    <ChoiceButtons
      :options="options"
      :disabled="isAnswered"
      :selected-answer="selectedAnswer"
      :correct-answer="correctAnswer"
      :show-result="isAnswered"
      @answer="handleAnswer"
    />

    <div class="progress-bar-wrap">
      <div class="progress-track">
        <div
          class="progress-fill"
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>
      <div class="progress-label">
        {{ gameState.correctAnswers }} correct
      </div>
    </div>

    <FeedbackOverlay
      :visible="showFeedback"
      :is-correct="lastAnswerCorrect"
      :correct-answer="correctAnswer"
      :coins-earned="lastCoinsEarned"
    />

    <!-- Confetti for correct answers -->
    <div v-if="showConfetti" class="confetti-container">
      <div
        v-for="i in 20"
        :key="i"
        class="confetti-piece"
        :style="confettiStyle(i)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useChordQuiz } from '@/composables/useChordQuiz.js'
import { useAudio } from '@/composables/useAudio.js'
import StaffDisplay from './StaffDisplay.vue'
import PlayChordButton from './PlayChordButton.vue'
import ChoiceButtons from './ChoiceButtons.vue'
import FeedbackOverlay from './FeedbackOverlay.vue'

const props = defineProps({
  gameState: { type: Object, required: true },
  levelConfig: { type: Object, required: true },
  totalQuestions: { type: Number, required: true },
})

const emit = defineEmits(['correct', 'wrong', 'round-end'])

const {
  currentChord, options, isAnswered, lastAnswerCorrect,
  correctAnswer, generateQuestion, checkAnswer, reset,
} = useChordQuiz(computed(() => props.levelConfig))

const { playCorrectSound, playWrongSound } = useAudio()

const showFeedback = ref(false)
const showConfetti = ref(false)
const selectedAnswer = ref('')
const lastCoinsEarned = ref(0)

const progressPercent = computed(() =>
  (props.gameState.currentQuestion / props.totalQuestions) * 100
)

onMounted(() => {
  reset()
  generateQuestion()
})

function handleAnswer(selected) {
  if (isAnswered.value) return

  selectedAnswer.value = selected
  const correct = checkAnswer(selected)

  if (correct) {
    lastCoinsEarned.value = emit('correct') || 0
    playCorrectSound()
    showConfetti.value = true
    setTimeout(() => { showConfetti.value = false }, 1200)
  } else {
    lastCoinsEarned.value = 0
    emit('wrong')
    playWrongSound()
  }

  showFeedback.value = true

  setTimeout(() => {
    showFeedback.value = false
    if (props.gameState.currentQuestion >= props.totalQuestions) {
      emit('round-end')
    } else {
      generateQuestion()
      selectedAnswer.value = ''
    }
  }, 1500)
}

const confettiColors = ['#FFD700', '#FF6B6B', '#4CAF50', '#4A90D9', '#FF9800', '#9C27B0']

function confettiStyle(i) {
  const color = confettiColors[i % confettiColors.length]
  const left = Math.random() * 100
  const delay = Math.random() * 0.5
  const size = 6 + Math.random() * 6
  return {
    background: color,
    left: left + '%',
    width: size + 'px',
    height: size + 'px',
    animationDelay: delay + 's',
  }
}
</script>

<style scoped>
.game-screen {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px 0;
  position: relative;
}

.question-info {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-light);
}

.play-area {
  display: flex;
  justify-content: center;
  padding: 4px 0;
}

.progress-bar-wrap {
  padding: 8px 16px 16px;
}

.progress-track {
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: 5px;
  transition: width 0.4s ease;
}

.progress-label {
  text-align: center;
  font-size: 14px;
  color: var(--color-text-light);
  margin-top: 6px;
}

/* Confetti */
.confetti-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 200;
  overflow: hidden;
}

.confetti-piece {
  position: absolute;
  top: -10px;
  border-radius: 2px;
  animation: confetti-fall 1.2s ease-out forwards;
}
</style>
