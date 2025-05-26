<script setup lang="ts">
import type { Component } from 'vue'
import ALcircle from '../icons/ALcircle.vue'
import ENcircle from '../icons/ENcircle.vue'
import FRcircle from '../icons/FRcircle.vue'

const { locale, setLocale } = useI18n()

const icons: Record<string, Component> = {
  al: ALcircle,
  en: ENcircle,
  fr: FRcircle,
}

const supportedLocales = ['al', 'en', 'fr']

const switchLanguage = () => {
  const currentIndex = supportedLocales.indexOf(locale.value)
  const nextIndex = (currentIndex + 1) % supportedLocales.length
  setLocale(supportedLocales[nextIndex])
}

onKeyStroke(['l', 'L'], switchLanguage)
</script>

<template>
  <UButton
    class="flex flex-col justify-center items-center"
    color="primary"
    variant="soft"
    :aria-label="$t('theme.switchLanguage')"
    @click="switchLanguage"
  >
    <component
      :is="icons[locale]"
      class="w-full h-full md:w-2/3 lg:w-2/4 xl:w-2/5"
    />
    <span class="text-xs">{{ $t(`theme.languages.${locale}`) }}</span>
  </UButton>
</template>
