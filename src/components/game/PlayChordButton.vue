<template>
  <button class="play-btn" @click="handlePlay" :disabled="!chord">
    <span class="play-icon">🔊</span>
    <span>Listen</span>
  </button>
</template>

<script setup>
import { useAudio } from '@/composables/useAudio.js'

const props = defineProps({
  chord: { type: Object, default: null },
})

const { playChord } = useAudio()

function handlePlay() {
  if (props.chord) {
    playChord(props.chord.notes)
  }
}
</script>

<style scoped>
.play-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-primary);
  color: white;
  font-size: 18px;
  font-weight: 700;
  padding: 12px 28px;
  border-radius: 50px;
  box-shadow: var(--shadow);
  transition: background 0.2s, transform 0.15s;
}

.play-btn:hover:not(:disabled) {
  background: #3a7bc8;
  transform: translateY(-2px);
}

.play-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.play-icon {
  font-size: 22px;
}
</style>
