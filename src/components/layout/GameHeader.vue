<template>
  <header class="game-header">
    <div class="header-inner container">
      <CoinDisplay :coins="coins" />
      <div v-if="levelName" class="level-badge">
        {{ levelName }}
      </div>
      <div v-if="streak > 0" class="streak-badge">
        🔥 {{ streak }}
      </div>
      <button v-if="showBack" class="back-btn" @click="$emit('back')">
        ← Back
      </button>
    </div>
  </header>
</template>

<script setup>
import CoinDisplay from '@/components/progress/CoinDisplay.vue'

defineProps({
  coins: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  levelName: { type: String, default: '' },
  showBack: { type: Boolean, default: false },
})

defineEmits(['back'])
</script>

<style scoped>
.game-header {
  background: var(--color-white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  flex-wrap: wrap;
}

.level-badge {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-secondary);
  background: #f0ecff;
  padding: 4px 12px;
  border-radius: 50px;
}

.streak-badge {
  font-size: 16px;
  font-weight: 800;
  color: var(--color-streak);
  animation: pulse 0.8s ease infinite;
}

.back-btn {
  margin-left: auto;
  background: none;
  font-size: 15px;
  font-weight: 700;
  color: var(--color-primary);
  padding: 6px 12px;
  border-radius: 8px;
}

.back-btn:hover {
  background: #f0f4ff;
}
</style>
