<script lang="ts" setup>
const router = useRouter()

const mouseX = ref(0)
const mouseY = ref(0)
const isHovering = ref(false)

const props = defineProps({
  title: String,
  link: String || undefined,
  description: String,
  icon: Object,
  background: String,
  border: [String, String],
})

const handleMouseMove = (event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  mouseX.value = event.clientX - rect.left
  mouseY.value = event.clientY - rect.top
}
</script>

<template>
  <UCard
    class="backdrop-blur-[0.05rem] relative overflow-hidden"
    :ui="{
      background: 'mouse-effect bg-white/70 dark:bg-gray-900/70',
      header: {
        base: 'text-xl font-bold leading-6 text-gray-900 dark:text-white',
      },
      divide: '',
      ring: 'ring-8 ring-gray-200 dark:ring-gray-800 hover:ring-primary-800/35 dark:hover:ring-primary-800/35 transition-opacity',
    }"
    @mousemove="handleMouseMove"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
    @click="props.link ? router.push(props.link) : null"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3>{{ props.title || '' }}</h3>
        <UButton
          square
          icon="i-heroicons-chevron-right"
          variant="soft"
          aria-label=">"
          @click="props.link ? router.push(props.link) : null"
        />
      </div>
    </template>
    <template #default>
      <div
        v-show="isHovering"
        class="pointer-events-none absolute w-[300px] h-[300px] bg-primary/15
  rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
        :style="{
          left: `${mouseX}px`,
          top: `${mouseY}px`,
        }"
      />
      <div class="flex items-center justify-center">
        <component
          :is="props.icon"
          v-if="props.icon"
          class="cursor-pointer"
          @click="props.link ? router.push(props.link) : null"
        />
        <img
          v-else
          src="https://fakeimg.pl/150x150"
          alt="avatar"
        >
      </div>
    </template>
  </UCard>
</template>
