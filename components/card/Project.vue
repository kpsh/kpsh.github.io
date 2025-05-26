<script setup lang="ts">
defineProps<{
  title: string
  description: {
    en: string | null
    fr?: string | null
    al?: string | null
  }
  image: string
  tags: string[]
  url?: string
}>()
</script>

<template>
  <UCard
    class="p-3"
    :ui="{
      ring: 'ring-4 ring-gray-200 dark:ring-gray-800 transition-all duration-500 ease-in-out hover:ring-primary-500/50 dark:hover:ring-primary-400/50',
      divide: '',
      body: {
        padding: '',
      },
    }"
  >
    <div class="flex items-center justify-between mb-2">
      <div class="font-semibold text-lg mb-1">
        {{ title }}
      </div>
      <UBadge
        v-if="url === 'wip'"
        color="orange"
        variant="subtle"
      >
        {{ $t('common.wip') }}
      </UBadge>
      <UTooltip
        v-else-if="url"
        :text="url"
        :popper="{ placement: 'top', arrow: true }"
      >
        <UButton
          variant="link"
          class="ml-auto"
          size="xs"
          :to="url"
          target="_blank"
          rel="noopener"
          icon="i-heroicons-link"
        />
      </UTooltip>
    </div>

    <div class="flex flex-col sm:flex-row gap-4">
      <div class="w-full sm:w-1/2 flex items-center justify-center">
        <img
          :src="image"
          alt="Project image"
          class="object-cover rounded-lg aspect-video w-full"
        >
      </div>

      <div class="w-full sm:w-1/2 flex flex-col gap-2">
        <div class="flex flex-wrap gap-1">
          <div
            v-for="(tag, index) in tags"
            :key="index"
          >
            <UBadge
              color="white"
              variant="solid"
            >
              {{ tag }}
            </UBadge>
          </div>
        </div>
        <div class="text-gray-600 dark:text-gray-300 text-sm">
          {{ description[($i18n.locale as keyof typeof description)] || description.en }}
        </div>
      </div>
    </div>
  </UCard>
</template>
