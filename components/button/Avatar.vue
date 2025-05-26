<script setup lang="ts">
const state = reactive({
  isFirstTime: true,
  isWavePlaying: false,
  isCoolPlaying: false,
  currentImage: 'none' as 'none' | 'shadeless' | 'shades',
})

const waveVideo = ref<HTMLVideoElement>()
const coolVideo = ref<HTMLVideoElement>()

onMounted(async () => {
  await nextTick()
  await document.fonts.ready
  await waveVideo.value?.load()
  await coolVideo.value?.load()

  if (waveVideo.value) {
    state.isWavePlaying = true
    await waveVideo.value.play()
    waveVideo.value.onended = () => {
      state.isWavePlaying = false
      state.currentImage = 'shadeless'
      state.isFirstTime = false
    }
  }
})

const loadCoolVideo = () => {
  if (state.isWavePlaying || state.isCoolPlaying) return

  if (state.currentImage === 'shades') {
    state.currentImage = 'shadeless'
    return
  }

  if (coolVideo.value) {
    state.currentImage = 'none'
    state.isCoolPlaying = true
    coolVideo.value.play()
    coolVideo.value.onended = () => {
      state.isCoolPlaying = false
      state.currentImage = 'shades'
    }
  }
}

onKeyStroke(['k', 'K'], loadCoolVideo)
</script>

<template>
  <div class="rounded-lg overflow-hidden bg-gradient-to-b from-primary-100/30 to-primary-400/50 dark:from-primary-500/10 dark:to-primary-400/20">
    <video
      ref="waveVideo"
      class="w-full h-full object-cover"
      :class="{ hidden: !state.isWavePlaying }"
      muted
      src="../../assets/avatar/wave.webm"
    />
    <video
      ref="coolVideo"
      class="w-full h-full object-cover"
      :class="{ hidden: !state.isCoolPlaying }"
      muted
      src="../../assets/avatar/coolmode.webm"
    />
    <img
      v-show="state.currentImage === 'shadeless'"
      class="w-full h-full object-cover"
      src="../../assets/avatar/shadeless.webp"
      alt="Shadeless"
    >
    <img
      v-show="state.currentImage === 'shades'"
      class="w-full h-full object-cover"
      src="../../assets/avatar/shades.webp"
      alt="Shades"
    >
  </div>
</template>
