<template>
  <div class="home-screen container">
    <div class="hero animate-fade-in">
      <h1 class="title">🎹 Piano Chord Game</h1>
      <p class="subtitle">Learn to recognize chords on the staff!</p>
    </div>

    <div class="level-grid">
      <LevelCard
        v-for="level in levels"
        :key="level.id"
        :level="level"
        :unlocked="unlockedLevels.includes(level.id)"
        :best-score="levelScores[level.id] ?? null"
        class="animate-slide-up"
        :style="{ animationDelay: (level.id - 1) * 0.08 + 's' }"
        @select="$emit('start-level', level.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { LEVELS } from '@/data/levels.js'
import LevelCard from '@/components/progress/LevelCard.vue'

defineProps({
  unlockedLevels: { type: Array, default: () => [1] },
  levelScores: { type: Object, default: () => ({}) },
})

defineEmits(['start-level'])

const levels = LEVELS
</script>

<style scoped>
.home-screen {
  flex: 1;
  padding: 24px 16px 40px;
}

.hero {
  text-align: center;
  margin-bottom: 32px;
}

.title {
  font-size: 32px;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 6px;
}

.subtitle {
  font-size: 16px;
  color: var(--color-text-light);
}

.level-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
}

@media (max-width: 520px) {
  .level-grid {
    grid-template-columns: 1fr;
  }
  .title {
    font-size: 26px;
  }
}
</style>
