<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()

const cardRing = 'ring-2 ring-gray-200 dark:ring-gray-800 hover:ring-primary-400 dark:hover:ring-primary-600 hover:bg-primary-200/50 dark:hover:bg-primary-600/30 active:bg-primary-400 dark:active:bg-primary-600 transition duration-300 ease-in-out'
const allRoutes = [
  // {
  //   id: 1,
  //   title: 'navigation.about',
  //   link: '/about',
  //   keystroke: 'a',
  // },
  {
    id: 2,
    title: 'navigation.skills',
    link: '/skills',
    keystroke: ['s', 'S'],
  },
  {
    id: 3,
    title: 'navigation.projects',
    link: '/projects',
    keystroke: ['p', 'P'],
  },
  {
    id: 4,
    title: 'navigation.contact',
    link: '/contact',
    keystroke: ['r', 'R'],
  },
]

const pages = computed(() => {
  const index = allRoutes.findIndex(r => r.link === route.path)
  return {
    previous: index > 0 ? allRoutes[index - 1] : null,
    next: index < allRoutes.length - 1 ? allRoutes[index + 1] : null,
  }
})
</script>

<template>
  <div class="flex flex-col sm:flex-row w-full gap-4 text-gray-700 dark:text-gray-300 mr-0 sm:mr-4">
    <UCard
      v-if="pages.previous"
      :ui="{ base: 'w-full', ring: cardRing }"
      class="flex-1 sm:flex-none sm:w-1/2"
      @click="router.push(pages.previous.link)"
    >
      <div class="flex sm:block items-center justify-start gap-2 sm:gap-0 hover:cursor-pointer">
        <UIcon
          name="heroicons-arrow-left-circle"
          class="w-8 h-8"
        />
        <h2 class="text-lg font-semibold">
          {{ $t(pages.previous.title) }}
        </h2>
      </div>
    </UCard>
    <UCard
      v-else
      class="flex-1 sm:flex-none sm:w-1/2 invisible"
    />
    <UCard
      v-if="pages.next"
      :ui="{ base: 'w-full', ring: cardRing }"
      class="flex-1 sm:flex-none sm:w-1/2"
      @click="router.push(pages.next.link)"
    >
      <div class="flex sm:block items-center justify-end gap-2 sm:gap-0 hover:cursor-pointer text-right">
        <UIcon
          name="heroicons-arrow-right-circle"
          class="w-8 h-8 sm:float-right sm:mb-1 order-last sm:order-none"
        />
        <h2 class="text-lg font-semibold sm:clear-both">
          {{ $t(pages.next.title) }}
        </h2>
      </div>
    </UCard>
    <UCard
      v-else
      class="flex-1 sm:flex-none sm:w-1/2 invisible"
    />
  </div>
</template>
