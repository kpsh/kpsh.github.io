<script lang="ts" setup>

</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  ><!-- Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt -->
    <g
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="2"
    >
      <path
        fill="currentColor"
        fill-opacity="0"
        stroke-dasharray="60"
        stroke-dashoffset="60"
        d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.5s"
          values="60;0"
        />
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="1.2s"
          dur="0.15s"
          values="0;0.3"
        />
      </path>
      <path
        fill="none"
        stroke-dasharray="20"
        stroke-dashoffset="20"
        d="M8.99999 10C8.99999 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10C15 10.9814 14.5288 11.8527 13.8003 12.4C13.0718 12.9473 12.5 13 12 14"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.6s"
          dur="0.4s"
          values="20;0"
        />
      </path>
    </g>
    <circle
      cx="12"
      cy="17"
      r="1"
      fill="currentColor"
      fill-opacity="0"
    >
      <animate
        fill="freeze"
        attributeName="fill-opacity"
        begin="1s"
        dur="0.2s"
        values="0;1"
      />
    </circle>
  </svg>
</template>
