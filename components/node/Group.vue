<script setup lang="ts">
import { computed } from 'vue'
import { Position, Handle } from '@vue-flow/core'

const props = defineProps<{
  data: {
    label: string
    angle: number
    height: number
  }
}>()

const handlePosition = computed(() => {
  const normalizedAngle = ((props.data.angle + Math.PI * 2) % (Math.PI * 2))

  // Left side of circle (315° to 45°)
  if (normalizedAngle <= Math.PI * 0.25 || normalizedAngle > Math.PI * 1.75) {
    return Position.Left
  }
  // Top of circle (45° to 135°)
  if (normalizedAngle <= Math.PI * 0.75) {
    return Position.Top
  }
  // Right side of circle (135° to 225°)
  if (normalizedAngle <= Math.PI * 1.25) {
    return Position.Right
  }
  // Bottom of circle (225° to 315°)
  return Position.Bottom
})
</script>

<template>
  <div
    class="min-w-[400px] p-4 rounded-lg bg-primary-100/50 dark:bg-primary-900/50 border-2 border-primary-300/70 dark:border-primary-700/70 backdrop-blur-[0.5px] dark:backdrop-blur-[2px]"
    :style="{ height: `${data.height}px` }"
  >
    <Handle
      type="target"
      :position="handlePosition"
    />
    <div class="font-medium text-xl capitalize mb-4">
      {{ data.label }}
    </div>
    <div class="grid grid-cols-2 gap-2">
      <slot />
    </div>
  </div>
</template>
