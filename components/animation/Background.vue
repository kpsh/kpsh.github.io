<script lang="ts" setup>
const { gsap } = useGsap()
const { x: mouseX, y: mouseY } = useMouse()
const { pressed: mousePressed } = useMousePressed()

const width = ref(window.innerWidth)
const height = ref(window.innerHeight)

interface Star {
  x: number
  y: number
  size: number
  opacity: number
}

interface FallingStar {
  x: number
  y: number
  speed: number
  angle: number
  points: { x: number, y: number }[]
}

const stars = ref<Star[]>([])
const fallingStars = ref<FallingStar[]>([])

const updateDimensions = () => {
  width.value = window.innerWidth
  height.value = window.innerHeight
}

const createStar = (x?: number, y?: number): Star => ({
  x: x ?? Math.random() * width.value,
  y: y ?? Math.random() * height.value,
  size: Math.random() * 0.8 + 0.2,
  opacity: Math.random(),
})

const createFallingStar = (x?: number, y?: number): FallingStar => ({
  x: x ?? Math.random() * width.value,
  y: y ?? Math.random() * height.value,
  speed: Math.random() * 3 + 4,
  angle: Math.PI / 4 + (Math.random() * Math.PI) / 8,
  points: [],
})

onMounted(() => {
  window.addEventListener('resize', updateDimensions)
  stars.value = Array.from({ length: 200 }, () => createStar())

  gsap.ticker.add(() => {
    // Update background stars
    stars.value.forEach((star, index) => {
      star.opacity += (Math.random() - 0.5) * 0.05
      star.opacity = Math.max(0, Math.min(1, star.opacity))

      if (Math.random() < 0.001) {
        stars.value[index] = createStar()
      }
    })

    // Update falling stars
    const mouseInfluence = (mouseX.value / width.value - 0.5) * Math.PI / 4

    fallingStars.value.forEach((star, starIndex) => {
      star.x += Math.cos(star.angle + mouseInfluence) * star.speed
      star.y += Math.sin(star.angle + mouseInfluence) * star.speed

      star.points.unshift({ x: star.x, y: star.y })
      star.points = star.points.slice(0, 10)

      if (star.y > height.value || star.x < 0 || star.x > width.value) {
        fallingStars.value.splice(starIndex, 1)
      }
    })

    if (mousePressed.value && Math.random() < 0.3) {
      const count = Math.floor(Math.random() * 3) + 1
      for (let i = 0; i < count; i++) {
        fallingStars.value.push(createFallingStar())
      }
    }
    else if (Math.random() < 0.01) {
      fallingStars.value.push(createFallingStar())
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
  gsap.ticker.remove()
})
</script>

<template>
  <svg
    class="fixed inset-0 w-full h-full -z-10"
    :width="width"
    :height="height"
  >
    <circle
      v-for="star in stars"
      :key="`star-${star.x}-${star.y}`"
      :cx="star.x"
      :cy="star.y"
      :r="star.size"
      class="text-primary"
      :style="{ opacity: star.opacity }"
      fill="currentColor"
    />
    <g
      v-for="(star, index) in fallingStars"
      :key="`falling-${index}`"
      class="text-primary"
    >
      <polyline
        v-if="star.points.length > 1"
        :points="star.points.map(p => `${p.x},${p.y}`).join(' ')"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        :style="{ opacity: 0.8 }"
      />
    </g>
  </svg>
</template>
