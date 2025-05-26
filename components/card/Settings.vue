<script lang="ts" setup>

</script>

<template>
  <UCard
    class="backdrop-blur-[0.05rem]"
    :ui="{
      background: 'bg-white/70 dark:bg-gray-900/70',
      ring: 'ring-8 ring-gray-200 dark:ring-gray-800',
    }"
  >
    <div class="flex flex-row md:flex-col justify-center align-middle gap-4">
      <ThemeSwitch />
      <ThemeColor />
      <ThemeLanguage />
      <!-- <ThemeHelp /> -->
      <!-- <ThemeFunky /> -->
      <!-- <ThemeText /> -->
    </div>
  </UCard>
</template>
