<template>
  <button
    class="level-card"
    :class="{ locked: !unlocked, current: unlocked }"
    :style="unlocked ? { borderColor: levelColor } : {}"
    :disabled="!unlocked"
    @click="$emit('select')"
  >
    <div class="level-header">
      <span class="level-emoji">{{ level.emoji }}</span>
      <span class="level-number" :style="unlocked ? { color: levelColor } : {}">
        Level {{ level.id }}
      </span>
    </div>
    <div class="level-name">{{ level.name }}</div>
    <div class="level-desc">{{ level.description }}</div>
    <div v-if="unlocked && bestScore !== null" class="level-score">
      Best: {{ bestScore }}/{{ level.questionsPerRound }}
    </div>
    <div v-if="unlocked" class="level-progress">
      <ProgressBar
        :percent="progressPercent"
        :color="levelColor"
      />
    </div>
    <div v-if="!unlocked" class="lock-icon">🔒</div>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import ProgressBar from './ProgressBar.vue'

const props = defineProps({
  level: { type: Object, required: true },
  unlocked: { type: Boolean, default: false },
  bestScore: { type: Number, default: null },
})

defineEmits(['select'])

const levelColors = {
  1: 'var(--level-1)', 2: 'var(--level-2)', 3: 'var(--level-3)',
  4: 'var(--level-4)', 5: 'var(--level-5)', 6: 'var(--level-6)',
}

const levelColor = computed(() => levelColors[props.level.id] || 'var(--color-primary)')

const progressPercent = computed(() => {
  if (props.bestScore === null) return 0
  return Math.min((props.bestScore / props.level.passingScore) * 100, 100)
})
</script>

<style scoped>
.level-card {
  background: var(--color-white);
  border: 3px solid #e0e0e0;
  border-radius: var(--radius-lg);
  padding: 20px;
  text-align: center;
  box-shadow: var(--shadow);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  width: 100%;
}

.level-card.current:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.level-card.locked {
  opacity: 0.5;
  cursor: default;
}

.level-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 6px;
}

.level-emoji {
  font-size: 28px;
}

.level-number {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.level-name {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 4px;
}

.level-desc {
  font-size: 14px;
  color: var(--color-text-light);
  margin-bottom: 10px;
}

.level-score {
  font-size: 13px;
  color: var(--color-text-light);
  margin-bottom: 8px;
}

.level-progress {
  margin-top: 4px;
}

.lock-icon {
  font-size: 32px;
  margin-top: 8px;
}
</style>
