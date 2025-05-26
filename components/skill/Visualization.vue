<script setup lang="ts">
import { VueFlow, type NodeTypesObject } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/controls/dist/style.css'
import { NodeCategory, NodeGroup, NodeParent, NodeSkill } from '#components'
import type { SkillsData } from '~/types/skills'

const props = defineProps<{
  skillsData: SkillsData
}>()

const nodeTypes = markRaw({
  parent: NodeParent,
  category: NodeCategory,
  group: NodeGroup,
  skill: NodeSkill,
}) as NodeTypesObject

const { nodes, edges, processSkillsData } = useSkillVisualization(props.skillsData)

watch(() => props.skillsData, processSkillsData, { immediate: true })

const container = ref<HTMLElement | null>(null)
const { height } = useElementSize(container)
</script>

<template>
  <div
    ref="container"
    class="flex flex-col h-full w-full"
  >
    <p class="font-light text-sm mb-2">
      Zoom in/out or scroll to navigate
    </p>
    <div class="flex-1 relative">
      <VueFlow
        :style="{ height: `${height - 30}px` }"
        :nodes="nodes"
        :edges="edges"
        :node-types="nodeTypes"
        :default-viewport="{ zoom: 0.9 }"
        :max-zoom="4"
        :min-zoom="0.1"
        fit-view-on-init
      >
        <Controls />
        <Background :gap="20" />
      </VueFlow>
    </div>
  </div>
</template>
