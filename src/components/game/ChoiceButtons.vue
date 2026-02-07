<template>
  <div class="choice-grid">
    <button
      v-for="(option, index) in options"
      :key="option"
      class="choice-btn"
      :class="buttonClass(option, index)"
      :disabled="disabled"
      @click="$emit('answer', option)"
    >
      {{ option }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  options: { type: Array, required: true },
  disabled: { type: Boolean, default: false },
  selectedAnswer: { type: String, default: '' },
  correctAnswer: { type: String, default: '' },
  showResult: { type: Boolean, default: false },
})

defineEmits(['answer'])

const btnColors = ['btn-color-1', 'btn-color-2', 'btn-color-3', 'btn-color-4']

function buttonClass(option, index) {
  const classes = [btnColors[index]]
  if (props.showResult) {
    if (option === props.correctAnswer) {
      classes.push('correct')
    } else if (option === props.selectedAnswer && option !== props.correctAnswer) {
      classes.push('wrong')
    } else {
      classes.push('dimmed')
    }
  }
  return classes
}
</script>

<style scoped>
.choice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  padding: 0 8px;
  max-width: 500px;
  margin: 0 auto;
}

.choice-btn {
  min-height: 60px;
  border-radius: var(--radius);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  box-shadow: var(--shadow);
  transition: transform 0.15s, box-shadow 0.15s, background 0.3s, opacity 0.3s;
}

.choice-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.choice-btn:disabled {
  cursor: default;
}

.btn-color-1 { background: var(--btn-1); }
.btn-color-2 { background: var(--btn-2); }
.btn-color-3 { background: var(--btn-3); }
.btn-color-4 { background: var(--btn-4); }

.correct {
  background: var(--color-correct) !important;
  color: white;
  animation: bounce-in 0.4s ease-out;
}

.wrong {
  background: var(--color-wrong) !important;
  color: white;
  animation: shake 0.4s ease;
}

.dimmed {
  opacity: 0.4;
}

@media (max-width: 420px) {
  .choice-grid {
    grid-template-columns: 1fr;
  }
  .choice-btn {
    min-height: 52px;
    font-size: 16px;
  }
}
</style>
