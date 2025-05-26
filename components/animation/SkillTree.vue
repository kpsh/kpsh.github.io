<script setup>
const { gsap } = useGsap()

const branch1Length = ref(0)
const branch2Length = ref(0)
const branch3Length = ref(0)

onMounted(() => {
  branch1Length.value = document.querySelector('#branch1').getTotalLength()
  branch2Length.value = document.querySelector('#branch2').getTotalLength()
  branch3Length.value = document.querySelector('#branch3').getTotalLength()

  gsap.set('#secondaryCircle', { scale: 0, transformOrigin: 'center', opacity: 0 })
  gsap.set('#rectangleLeft', { scale: 0, transformOrigin: 'center', opacity: 0 })
  gsap.set('#rectangleRight', { scale: 0, transformOrigin: 'center', opacity: 0 })

  gsap.set('#branch1', {
    strokeDasharray: branch1Length.value,
    strokeDashoffset: branch1Length.value,
  })
  gsap.set('#branch2', {
    strokeDasharray: branch2Length.value,
    strokeDashoffset: branch2Length.value,
  })
  gsap.set('#branch3', {
    strokeDasharray: branch3Length.value,
    strokeDashoffset: branch3Length.value,
  })

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 })

  tl.to({}, { duration: 0.5 })
    .to('#branch1, #branch2, #branch3', { strokeDashoffset: 0, duration: 2 }, '-=0.5')
    .to('#rectangleLeft, #rectangleRight', { scale: 1, opacity: 1, duration: 1 }, '-=0.5')
    .to('#secondaryCircle', { scale: 1, opacity: 1, duration: 1 })
    .to({}, { duration: 1 })
    .to([
      '#primaryCircle',
      '#secondaryCircle',
      '#rectangleLeft',
      '#rectangleRight',
      '#branch1',
      '#branch2',
      '#branch3',
    ], {
      y: 140,
      duration: 1,
      ease: 'none',
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
    <!-- branches -->
    <g class="stroke-primary-300/50 stroke-[20px]">
      <line
        id="branch1"
        x1="100"
        y1="180"
        x2="30"
        y2="100"
        stroke-linecap="round"
      />
      <line
        id="branch2"
        x1="100"
        y1="180"
        x2="100"
        y2="40"
        stroke-linecap="round"
      />
      <line
        id="branch3"
        x1="100"
        y1="180"
        x2="170"
        y2="100"
        stroke-linecap="round"
      />
    </g>
    <g class="fill-primary">
      <!-- primary circle -->
      <circle
        id="primaryCircle"
        cx="100"
        cy="180"
        r="20"
      />
      <!-- secondary circle -->
      <circle
        id="secondaryCircle"
        cx="100"
        cy="40"
        r="20"
      />
    </g>
    <g class="fill-primary-600 rounded-lg">
      <!-- rectangle left -->
      <rect
        id="rectangleLeft"
        x="15"
        y="85"
        width="30"
        height="30"
        rx="4"
      />
      <!-- rectangle right -->
      <rect
        id="rectangleRight"
        x="155"
        y="85"
        width="30"
        height="30"
        rx="4"
      />
    </g>
  </svg>
</template>
