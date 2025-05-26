<script setup lang="ts">
const router = useRouter()
const attrs = useAttrs()

const code = computed(() => {
  return attrs?.error?.statusCode || 404
})

const message = computed(() => {
  if (attrs?.error?.statusCode === 404) {
    return 'Page not found'
  }
  return attrs?.error?.statusMessage || 'Page not found'
})

const description = computed(() => {
  if (attrs?.error?.statusCode === 404) {
    return 'The page you\'re looking for doesn\'t exist or has been moved.'
  }
  return 'The page you\'re looking for doesn\'t exist or has been moved.'
})
</script>

<template>
  <UContainer
    :ui="{
      base: 'min-h-screen flex flex-col justify-center items-center text-center',
      padding: 'px-4 py-4 sm:px-6 lg:px-8',
      constrained: 'max-w-7xl',
    }"
  >
    <h1 class="text-9xl font-extrabold text-gray-900 dark:text-gray-200 animate-bounce">
      {{ code }}
    </h1>
    <p class="text-2xl font-medium text-gray-600 dark:text-gray-400 mb-8">
      {{ message }}
    </p>
    <div class="space-y-4">
      <p class="text-gray-500">
        {{ description }}
      </p>
      <UButton
        size="xl"
        icon="i-heroicons-home"
        @click="router.replace('/')"
      >
        Return Home
      </UButton>
    </div>
  </UContainer>
</template>
