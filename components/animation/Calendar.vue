<script lang="ts" setup>
const { gsap } = useGsap()

const RECT_SIZE = {
  x: 23,
  y: 35,
}
const SPACING = 5

const getDaysInMonth = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  return new Date(year, month, 1).getDay()
}

const currentDate = new Date()
const daysInMonth = getDaysInMonth(currentDate)
const firstDay = getFirstDayOfMonth(currentDate)
const today = currentDate.getDate()

const days = Array.from({ length: daysInMonth }, (_, i) => {
  const dayNumber = i + 1
  const dayOfWeek = (firstDay + i) % 7
  return {
    day: dayNumber,
    isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
    isToday: dayNumber === today,
    x: (dayOfWeek * (RECT_SIZE.x + SPACING)) + SPACING,
    y: (Math.floor((firstDay + i) / 7) * (RECT_SIZE.y + SPACING)) + SPACING,
  }
})

const lastWeekdayPosition = computed(() => {
  const lastWeekday = [...days].reverse().find(day => !day.isWeekend)
  return lastWeekday
    ? {
        x: lastWeekday.x,
        y: lastWeekday.y,
      }
    : { x: 125, y: 125 }
})

onMounted(() => {
  const tl = gsap.timeline({
    repeat: -1,
    repeatDelay: 0.5,
  })

  tl.set('.call-icon, .pointer-line', {
    opacity: 0,
  })

  tl.from('.calendar-rect', {
    opacity: 0,
    scale: 0,
    duration: 1,
    stagger: {
      amount: 1.5,
      grid: [7, 6],
      from: 'start',
      ease: 'power2.out',
    },
    transformOrigin: 'center center',
    ease: 'back.out(1.7)',
  })

  tl.fromTo('.pointer-circle', {
    x: 222,
    y: 222,
  }, {
    x: lastWeekdayPosition.value.x,
    y: lastWeekdayPosition.value.y,
    scale: 1,
    duration: 2,
    ease: 'power2.inOut',
  })
  tl.to('.pointer-circle', {
    scale: 1.2,
    duration: 0.5,
    yoyo: true,
    ease: 'power2.inOut',
    transformOrigin: 'center center',
  })
  tl.to('.pointer-circle', {
    scale: 1,
    duration: 0.25,
    yoyo: true,
    ease: 'power2.inOut',
    transformOrigin: 'center center',
  })
  tl.to({}, {
    duration: 0.5,
  })
  tl.to('.pointer-circle', {
    opacity: 0,
    duration: 0.5,
  })
  tl.to('.calendar-group', {
    x: -120,
    duration: 1,
    ease: 'power2.out',
  })
  tl.to('.call-icon, .pointer-line', {
    opacity: 1,
    duration: 5,
  })
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    width="200"
    height="200"
  >

    <g class="calendar-group">
      <rect
        v-for="{ day, isWeekend, isToday, x, y } in days"
        :key="day"
        class="calendar-rect"
        :x="x"
        :y="y"
        :width="RECT_SIZE.x"
        :height="RECT_SIZE.y"
        rx="4"
        :class="{
          'stroke-primary-500': isToday,
          'fill-gray-400/50': isWeekend,
          'fill-primary-300/50': !isWeekend,
        }"
      />
      <rect
        class="pointer-rect fill-primary-600/30 stroke-primary-600/50 stroke-2"
        x="205"
        y="5"
        rx="8"
        width="110"
        height="194"
      />
      <IconsCallLoop
        class="call-icon text-primary-500 dark:text-primary-500"
        x="242"
        y="30"
      />
      <line
        x1="220"
        y1="75"
        x2="300"
        y2="75"
        class="pointer-line stroke-primary-600/50 stroke-1"
      />
      <IconsEmail
        class="call-icon text-primary-500 dark:text-primary-500"
        x="242"
        y="90"
      />
      <line
        x1="220"
        y1="135"
        x2="300"
        y2="135"
        class="pointer-line stroke-primary-600/50 stroke-1"
      />
      <IconsCoffee
        class="call-icon text-primary-500 dark:text-primary-500"
        x="242"
        y="150"
      />
    </g>
    <circle
      class="pointer-circle fill-yellow-700/30 stroke-yellow-700 stroke-2"
      cx="10"
      cy="10"
      r="15"
    />
  </svg>
</template>
