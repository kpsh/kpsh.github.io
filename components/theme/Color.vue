<script setup lang="ts">
const colors = ['sky', 'red', 'teal', 'yellow']
const appConfig = useAppConfig()
const currentColorIndex = ref(0)

const cycleColor = () => {
  currentColorIndex.value = (currentColorIndex.value + 1) % colors.length
  const color = colors[currentColorIndex.value]
  appConfig.ui.primary = color
  localStorage.setItem('nuxt-color-primary', color)
}

onMounted(() => {
  const savedColor = localStorage.getItem('nuxt-color-primary')
  if (savedColor) {
    appConfig.ui.primary = savedColor
    currentColorIndex.value = colors.indexOf(savedColor)
  }
})

onKeyStroke(['c', 'C'], cycleColor)
</script>

<template>
  <UButton
    class="flex flex-col justify-center items-center"
    color="primary"
    variant="soft"
    icon="i-heroicons-swatch-solid"
    :aria-label="$t('theme.changeColor')"
    @click="cycleColor"
  >
    <template #leading>
      <IconsPaintBrush class="w-full h-full md:w-2/3 lg:w-2/4 xl:w-2/5" />
    </template>
    <span class="text-xs">{{ $t(`theme.colors.${appConfig.ui.primary}`) }}</span>
  </UButton>
</template>
