<script setup lang="ts">
import { computed } from 'vue'
import { Position, Handle } from '@vue-flow/core'

const props = defineProps<{
  data: {
    label: string
    childCount: number
  }
}>()

const handles = computed(() => {
  const count = props.data.childCount
  const circleRadius = 70
  const handles = []

  for (let i = 0; i < count; i++) {
    const angle = (2 * Math.PI * i) / count
    const x = 50 + circleRadius * Math.cos(angle)
    const y = 50 + circleRadius * Math.sin(angle)

    const position = getHandlePosition(angle)

    handles.push({
      id: `handle-${i}`,
      position,
      x,
      y,
    })
  }

  return handles
})

function getHandlePosition(angle: number): Position {
  const degrees = ((angle * 180 / Math.PI) + 360) % 360

  if (degrees >= 315 || degrees < 45) return Position.Right
  if (degrees >= 45 && degrees < 135) return Position.Bottom
  if (degrees >= 135 && degrees < 225) return Position.Left
  return Position.Top
}
</script>

<template>
  <div class="relative flex items-center justify-center w-[100px] h-[100px]">
    <div class="absolute w-36 h-36 rounded-full bg-primary flex items-center justify-center text-4xl font-semibold">
      {{ props.data.label }}
    </div>
    <Handle
      v-for="handle in handles"
      :id="handle.id"
      :key="handle.id"
      :position="handle.position"
      :connectable="false"
      :style="{
        left: `${handle.x}px`,
        top: `${handle.y}px`,
        transform: 'translate(-50%, -50%)',
      }"
      type="source"
      class="opacity-0"
    />
  </div>
</template>
