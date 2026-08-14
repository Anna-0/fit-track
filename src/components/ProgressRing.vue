<template>
  <div class="ring-wrapper">
    <svg viewBox="0 0 120 120" class="ring-svg">
      <circle
        cx="60" cy="60" r="50"
        fill="none"
        stroke="#2a2a2a"
        stroke-width="10"
      />
      <circle
        cx="60" cy="60" r="50"
        fill="none"
        stroke="#ff7a00"
        stroke-width="10"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-linecap="round"
        transform="rotate(-90 60 60)"
        class="progress-circle"
      />
      <text x="60" y="55" text-anchor="middle" class="ring-number">{{ value }}/{{ total }}</text>
      <text x="60" y="75" text-anchor="middle" class="ring-label">本周训练</text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
  total: number
}>()

const circumference = 2 * Math.PI * 50

const offset = computed(() => {
  const ratio = Math.min(props.value / props.total, 1)
  return circumference * (1 - ratio)
})
</script>

<style scoped>
.ring-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ring-svg {
  width: 140px;
  height: 140px;
}
.ring-number {
  font-size: 22px;
  font-weight: 700;
  fill: #fff;
}
.ring-label {
  font-size: 11px;
  fill: #888;
}
.progress-circle {
  transition: stroke-dashoffset 0.6s ease;
}
</style>