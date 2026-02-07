<template>
  <div class="progress-bar">
    <div class="track">
      <div class="fill" :style="{ width: percent + '%', background: color }"></div>
    </div>
    <div v-if="showLabel" class="label">{{ Math.round(percent) }}%</div>
  </div>
</template>

<script setup>
defineProps({
  percent: { type: Number, default: 0 },
  color: { type: String, default: 'var(--color-primary)' },
  showLabel: { type: Boolean, default: false },
})
</script>

<style scoped>
.progress-bar {
  width: 100%;
}

.track {
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.label {
  font-size: 12px;
  color: var(--color-text-light);
  text-align: right;
  margin-top: 2px;
}
</style>
