<template>
  <div class="coin-display">
    <span class="coin-icon">🪙</span>
    <span class="coin-count">{{ coins }}</span>
  </div>
</template>

<script setup>
defineProps({
  coins: { type: Number, default: 0 },
})
</script>

<style scoped>
.coin-display {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #FFF8DC, #FFE4B5);
  padding: 6px 14px;
  border-radius: 50px;
  font-weight: 800;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
}

.coin-icon {
  font-size: 20px;
}

.coin-count {
  color: #B8860B;
}
</style>
