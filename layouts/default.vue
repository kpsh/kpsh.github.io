<script lang="ts" setup>
import SkillTree from '~/components/animation/SkillTree.vue'
import ProjectStack from '~/components/animation/ProjectStack.vue'
import Calendar from '~/components/animation/Calendar.vue'

const route = useRoute()
const router = useRouter()

const isOpen = ref(route.fullPath !== '/')

watch(
  () => route.fullPath,
  async (path) => {
    await nextTick()
    isOpen.value = path !== '/'
  },
  { immediate: true },
)

const handleOpenSlideover = () => {
  isOpen.value = true
}

const handleCardClick = (link: string) => {
  isOpen.value = true
  router.push(link)
}

watch(isOpen, (value) => {
  if (!value && route.fullPath !== '/') {
    router.push('/')
  }
})

onKeyStroke(['s', 'S'], () => handleCardClick('/skills'))
onKeyStroke(['p', 'P'], () => handleCardClick('/projects'))
onKeyStroke(['r', 'R'], () => handleCardClick('/contact'))

const { gsap } = useGsap()

onMounted(() => {
  nextTick(() => {
    gsap.set(['.about-me-card', '.settings-card', '.card-skills', '.card-projects', '.card-contact'], {
      opacity: 0,
      y: 50,
    })

    gsap.to('.about-me-card', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to('.settings-card', {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(['.card-skills', '.card-projects', '.card-contact'], {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.2,
              ease: 'power2.out',
            })
          },
        })
      },
    })
  })
})
</script>

<template>
  <div>
    <LazyAnimationBackground />

    <UContainer
      :ui="{
        base: 'flex justify-center items-center min-h-screen',
        padding: 'px-4 py-4 sm:px-6 lg:px-8',
        constrained: 'max-w-7xl',
      }"
    >
      <div class="grid grid-cols-12 gap-6">
        <CardAboutMe
          class="col-span-12 md:col-span-10 about-me-card"
          @open-slideover="handleOpenSlideover"
        />
        <CardSettings class="col-span-12 md:col-span-2 settings-card opacity-0" />
        <CardDefault
          class="col-span-12 sm:col-span-4 card-skills opacity-0"
          :title="$t('navigation.skills')"
          :icon="SkillTree"
          link="/skills"
          @click="handleCardClick('/skills')"
        />
        <CardDefault
          class="col-span-12 sm:col-span-4 card-projects opacity-0"
          :title="$t('navigation.projects')"
          :icon="ProjectStack"
          link="/projects"
          @click="handleCardClick('/projects')"
        />
        <CardDefault
          class="col-span-12 sm:col-span-4 card-contact opacity-0"
          :title="$t('navigation.contact')"
          :icon="Calendar"
          link="/contact"
          @click="handleCardClick('/contact')"
        />
      </div>
      <USlideover
        v-model="isOpen"
        :ui="{ width: 'w-screen max-w-3xl' }"
      >
        <UCard
          class="flex flex-col flex-1 overflow-y-auto"
          :ui="{
            ring: '',
            shadow: '',
            body: { base: 'flex-1 overflow-auto' },
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ route.matched.length > 0 ? route.meta.title ?? route.name : $t('error') }}
              </h3>
              <UButton
                class="-my-1"
                color="primary"
                variant="soft"
                size="lg"
                icon="i-heroicons-x-mark-20-solid"
                @click="isOpen = false"
              />
            </div>
          </template>

          <slot />

          <template #footer>
            <div class="flex justify-end">
              <BottomNavigation />
            </div>
          </template>
        </UCard>
      </USlideover>
    </UContainer>
  </div>
</template>
