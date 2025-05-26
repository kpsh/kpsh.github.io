<script setup lang="ts">
import type { Skill } from '~/types/skills'

defineProps<{
  data: Skill
}>()
</script>

<template>
  <div
    class="min-w-[160px] px-4 py-2 shadow-md rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
  >
    <div class="flex items-center gap-2">
      <UIcon
        v-if="data.icon"
        :name="data.icon"
        class="w-5 h-5"
      />
      <span class="truncate max-w-[100px]">
        {{ data.name }}
      </span>

      <UTooltip
        v-if="data.url"
        :text="data.url"
        :popper="{ placement: 'top', arrow: true }"
      >
        <UButton
          variant="link"
          class="ml-auto"
          size="xs"
          :to="data.url"
          target="_blank"
          rel="noopener"
          icon="i-heroicons-link"
        />
      </UTooltip>
    </div>
    <div
      v-if="data.description"
      class="max-w-[130px] mt-2 text-xs text-gray-600 dark:text-gray-400"
    >
      {{ data.description }}
    </div>
  </div>
</template>
