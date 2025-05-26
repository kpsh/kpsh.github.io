<script setup lang="ts">
import type { SkillsData } from '~/types/skills'

const props = defineProps<{
  skillsData: SkillsData
}>()

const { categories } = useSkillList(props.skillsData)

const accordionItems = computed(() =>
  categories.value.map(category => ({
    label: category.name.toUpperCase(),
    size: 'xl',
    variant: 'outline',
    defaultOpen: category.name === 'Frontend',
    category: category,
  })),
)
</script>

<template>
  <UAccordion
    class="mt-2 mb-3"
    :items="accordionItems"
    open-icon="i-heroicons-plus"
    close-icon="i-heroicons-minus"
  >
    <template #item="{ item }">
      <div class="space-y-6 px-4 pb-2">
        <div
          v-for="group in item.category.groups"
          :key="group.name"
          class="space-y-4"
        >
          <UDivider
            :label="group.name"
            class="capitalize"
            size="xl"
          />
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <CardSkill
              v-for="skill in group.skills"
              :key="skill.name"
              :skill="skill"
            />
          </div>
        </div>
      </div>
    </template>
  </UAccordion>
</template>
