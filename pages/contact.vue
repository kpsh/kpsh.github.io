<script lang="ts" setup>
definePageMeta({
  title: 'Contact Me',
  description: 'Contact page',
  slideover: true,
})

useSeoMeta({
  title: 'Contact Me',
  description: 'Contact page',
})

const el = useTemplateRef('contactParent')
const { height } = useElementSize(el)
</script>

<template>
  <div
    ref="contactParent"
    class="w-full h-full rounded-lg"
  >
    <iframe
      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0RU49GM4TGS9oSFvnrvsOwbmcLID4wZZHgdjE5acCEUgAe9iii7auzEv0lQPdgXoyyNLOXoMUs?gv=true&bgcolor=%23000000&amp;"
      class="rounded-lg"
      width="100%"
      :height="height"
      frameborder="0"
    />
  </div>
</template>
