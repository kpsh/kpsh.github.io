<script lang="ts" setup>
interface Props {
  text: string
  icon: string
  link: string
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

const props = defineProps<Props>()
const iconSrc = ref('')

const loadIcon = async () => {
  try {
    if (!props.icon.startsWith('i-')) {
      const { default: icon } = await import(`~/assets/skills/${props.icon}.svg`)
      iconSrc.value = icon
    }
  }
  catch (error) {
    console.error(`Failed to load icon: ${props.icon}`, error)
  }
}

watch(() => props.icon, loadIcon, { immediate: true })
</script>

<template>
  <UButton
    class="inline-flex py-0.5 px-1"
    color="primary"
    variant="outline"
    :label="props.text"
    :size="props.size"
    @click.prevent="async () => {
      await navigateTo(props.link)
      await navigateTo(props.link)
    }"
  >
    <template #leading>
      <UIcon
        v-if="props.icon && props.icon.startsWith('i-')"
        :name="props.icon"
      />
      <img
        v-else
        :src="iconSrc"
        alt="icon"
        class="h-3"
      >
    </template>
  </UButton>
</template>
