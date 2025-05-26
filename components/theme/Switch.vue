<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})

function toggleDark(event: MouseEvent) {
  if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    isDark.value = !isDark.value
    return
  }

  const { clientX: x, clientY: y } = event
  const radius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready.then(() => {
    const circle = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${radius}px at ${x}px ${y}px)`,
    ]

    document.documentElement.animate(
      { clipPath: isDark.value ? [...circle].reverse() : circle },
      {
        duration: 500,
        easing: 'ease-out',
        pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
      },
    )
  })
}

onKeyStroke(['t', 'T'], () => {
  isDark.value = !isDark.value
})
</script>

<template>
  <ClientOnly>
    <UButton
      class="flex flex-col justify-center items-center"
      color="primary"
      variant="soft"
      :aria-label="$t('theme.switchTheme')"
      @click="toggleDark"
    >
      <template #leading>
        <IconsMoon
          v-if="isDark"
          class="w-full h-full md:w-2/3 lg:w-2/4 xl:w-2/5"
        />
        <IconsSun
          v-else
          class="w-full h-full md:w-2/3 lg:w-2/4 xl:w-2/5"
        />
      </template>
      <span class="text-xs">{{ isDark ? $t('theme.modes.light') : $t('theme.modes.dark') }}</span>
    </UButton>
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
  z-index: 1;
}

.dark::view-transition-old(root) { z-index: 2; }
</style>
