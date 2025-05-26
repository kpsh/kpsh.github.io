<script setup lang="ts">
interface Skill {
  name: string
  description: string
  url: string
  icon: string
}

defineProps<{
  skill: Skill
}>()
</script>

<template>
  <UCard
    class="p-3"
    :ui="{
      ring: 'ring-2 ring-gray-200 dark:ring-gray-800 transition-all duration-500 ease-in-out hover:ring-primary-500/50 dark:hover:ring-primary-400/50',
      body: {
        padding: '',
      },
    }"
  >
    <div class="flex items-center justify-between gap-2">
      <span class="inline-flex gap-2 max-w-[100px] items-center">
        <UIcon
          :name="skill.icon"
          class="w-5 h-5"
        />
        <UTooltip
          :text="skill.name"
          :popper="{ placement: 'top' }"
        >
          <h3 class="font-semibold truncate">
            {{ skill.name }}
          </h3>
        </UTooltip>
      </span>
      <UTooltip
        v-if="skill.url"
        :text="skill.url"
        :popper="{ placement: 'top', arrow: true }"
      >
        <UButton
          v-if="skill.url"
          variant="link"
          class="ml-auto"
          size="xs"
          :to="skill.url"
          target="_blank"
          rel="noopener"
          icon="i-heroicons-link"
        />
      </UTooltip>
    </div>
    <p
      v-if="skill.description"
      class="mt-2 text-sm text-gray-600 dark:text-gray-400"
    >
      {{ skill.description }}
    </p>
  </UCard>
</template>
