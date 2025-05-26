<script setup lang="ts">
import { Position, Handle } from '@vue-flow/core'

const props = defineProps<{
  id: string
  data: {
    label: string
    groups: string[]
    angle?: number
  }
}>()

const { toggleCategoryVisibility } = useSkillVisualization()
const { getVisibility, setVisibility } = useVisibilityState()

const isVisible = ref(getVisibility(props.id))

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
  setVisibility(props.id, isVisible.value)
  toggleCategoryVisibility(props.id, isVisible.value)
}

const getHandles = computed(() => {
  const angle = props.data.angle || 0
  const normalizedAngle = ((angle + Math.PI * 2) % (Math.PI * 2))

  // Left side of circle (315° to 45°)
  if (normalizedAngle <= Math.PI * 0.25 || normalizedAngle > Math.PI * 1.75) {
    return [Position.Left, Position.Right]
  }
  // Top of circle (45° to 135°)
  if (normalizedAngle <= Math.PI * 0.75) {
    return [Position.Top, Position.Bottom]
  }
  // Right side of circle (135° to 225°)
  if (normalizedAngle <= Math.PI * 1.25) {
    return [Position.Right, Position.Left]
  }
  // Bottom of circle (225° to 315°)
  return [Position.Bottom, Position.Top]
})
</script>

<template>
  <div class="px-4 py-2 shadow-md rounded-md border-2 border-primary-500 bg-white dark:bg-gray-800">
    <Handle
      type="target"
      :position="getHandles[0]"
    />
    <div class="flex items-center py-1.5 justify-between gap-2 font-semibold text-3xl text-primary-700 dark:text-primary-300">
      {{ data.label }}
      <UButton
        variant="soft"
        size="xl"
        class="border border-primary-500"
        :icon="isVisible ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'"
        @click="toggleVisibility"
      />
    </div>
    <Handle
      :class="isVisible ? 'opacity-100' : 'opacity-0'"
      type="source"
      :position="getHandles[1]"
    />
  </div>
</template>
