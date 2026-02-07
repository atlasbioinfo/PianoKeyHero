<template>
  <div class="staff-wrapper">
    <div ref="staffContainer" class="staff-container"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useStaffRenderer } from '@/composables/useStaffRenderer.js'

const props = defineProps({
  chord: { type: Object, default: null },
})

const staffContainer = ref(null)
const { renderChord } = useStaffRenderer()

function render() {
  if (props.chord && staffContainer.value) {
    renderChord(staffContainer.value, props.chord.notes)
  }
}

onMounted(render)
watch(() => props.chord, render, { deep: true })

let resizeObserver
onMounted(() => {
  if (staffContainer.value) {
    resizeObserver = new ResizeObserver(render)
    resizeObserver.observe(staffContainer.value)
  }
})
onBeforeUnmount(() => resizeObserver?.disconnect())
</script>

<style scoped>
.staff-wrapper {
  display: flex;
  justify-content: center;
  padding: 16px 0;
}
.staff-container {
  width: 100%;
  max-width: 450px;
  min-height: 200px;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
