<script setup lang="ts">
const colorMode = useColorMode()

const setVariant = computed(() => {
  return colorMode.value === 'dark' ? 'solid' : 'outline'
})
</script>

<template>
  <UCard
    class="backdrop-blur-[0.05rem] about-me-card"
    :ui="{
      base: 'p-4',
      background: 'bg-white/70 dark:bg-gray-900/70',
      ring: 'ring-8 ring-primary-200 dark:ring-primary-800',
    }"
  >
    <div class="flex flex-col md:flex-row gap-6">
      <div class="max-w-[300px] md:items-center h-fit">
        <LazyButtonAvatar />
      </div>
      <div class="flex-1">
        <h1 class="text-md">
          {{ $t('aboutMe.greeting') }}
        </h1>
        <h2 class="text-3xl font-bold">
          Klohair Pashaj
        </h2>
        <div class="mt-2 sm:mt-4 flex gap-2">
          <UButton
            color="primary"
            :variant="setVariant"
            icon="i-logos-github-icon"
            to="https://github.com/kpsh/"
            target="_blank"
          />
          <UButton
            color="primary"
            :variant="setVariant"
            icon="i-logos-linkedin-icon"
            to="https://www.linkedin.com/in/kpsh/"
            target="_blank"
          />
          <UButton
            color="primary"
            :variant="setVariant"
            icon="i-logos-google-gmail"
            to="mailto:kloipashaj@gmail.com"
            target="_blank"
          />
        </div>
        <p class="mt-2 sm:mt-4">
          {{ $t('aboutMe.role') }} {{ $t('aboutMe.country') }}
          <IconsALcircle class="inline-flex w-[1em] h-auto" />,
          {{ $t('aboutMe.description') }}
          <ButtonReference
            icon="nuxt"
            link="/skills#nuxt"
            text="Nuxt"
          />
          {{ $t('aboutMe.and') }}
          <ButtonReference
            icon="vue"
            link="/skills#vue"
            text="Vue"
          />,
          {{ $t('aboutMe.techDescription') }}
        </p>
        <p class="mt-2 sm:mt-4">
          {{ $t('aboutMe.personalInterests') }}
        </p>
        <p class="mt-2 sm:mt-4">
          {{ $t('aboutMe.callToAction') }}
        </p>
      </div>
    </div>

    <div class="flex justify-end mt-4">
      <UButton
        color="primary"
        variant="soft"
        icon="i-heroicons-arrow-right-20-solid"
        trailing
        to="/contact"
        @click="$emit('open-slideover')"
      >
        {{ $t('aboutMe.connectButton') }}
      </UButton>
    </div>
  </UCard>
</template>
