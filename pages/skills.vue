<script setup lang="ts">
import skills from '@/assets/skills.json'

definePageMeta({
  title: 'Skills & Tools',
  slideover: true,
})

useSeoMeta({
  title: 'Skills',
  description: 'Skills & Tools',
})

const { width } = useWindowSize()

const selectedTab = useLocalStorage('skills-tab', 0)

const items = [
  {
    label: 'Skills Visualization',
    icon: 'i-heroicons-rectangle-group',
    content: 'A visualization of my skills and tools I\'ve used.',
  },
  {
    label: 'Skills List',
    icon: 'i-heroicons-rectangle-stack',
    content: 'A list of my skills and tools I\'ve used.',
  },
]
</script>

<template>
  <div class="flex flex-col h-full w-full">
    <UTabs
      v-model="selectedTab"
      :orientation="width < 640 ? 'vertical' : 'horizontal'"
      :items="items"
      class="mb-4"
    >
      <template #icon="{ item, selected }">
        <UIcon
          :name="item.icon"
          class="w-5 h-5 flex-shrink-0 me-2"
          :class="[selected && 'text-primary-500 dark:text-primary-400']"
        />
      </template>
      <template #default="{ item, selected }">
        <span
          class="truncate"
          :class="[selected && 'text-primary-500 dark:text-primary-400']"
        >
          {{ item.label }}
        </span>
      </template>
    </UTabs>

    <div class="flex-1">
      <SkillVisualization
        v-if="selectedTab === 0"
        :skills-data="skills"
      />
      <SkillList
        v-if="selectedTab === 1"
        :skills-data="skills"
      />
    </div>
  </div>
</template>
