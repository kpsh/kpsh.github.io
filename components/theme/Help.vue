<script setup lang="ts">
const isHelpOpen = ref(false)
const switchHelp = () => {
  isHelpOpen.value = !isHelpOpen.value
}

onKeyStroke(['h', 'H'], switchHelp)
</script>

<template>
  <UButton
    class="flex flex-col justify-center items-center"
    color="primary"
    variant="soft"
    :aria-label="$t('theme.switchHelp')"
    @click="switchHelp"
  >
    <template #leading>
      <IconsHelp class="w-full h-full md:w-2/3 lg:w-2/4 xl:w-2/5" />
    </template>
    <span class="text-xs">{{ $t(`theme.help`) }}</span>
  </UButton>

  <UModal v-model="isHelpOpen">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t('theme.help') }}
          </h3>

          <UButton
            class="-my-1"
            color="primary"
            variant="soft"
            size="lg"
            icon="i-heroicons-x-mark-20-solid"
            @click="switchHelp"
          />
        </div>
      </template>

      <div>
        123
      </div>
    </UCard>
  </UModal>
</template>
