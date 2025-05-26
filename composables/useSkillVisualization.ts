import { useVueFlow } from '@vue-flow/core'
import { watchDeep } from '@vueuse/core'
import type { SkillsData } from '~/types/skills'

const getRadialPosition = (centerX: number, centerY: number, radius: number, angle: number) => ({
  x: centerX + Math.cos(angle) * radius,
  y: centerY + Math.sin(angle) * radius,
})

export const useSkillVisualization = (skillsData: SkillsData) => {
  const { nodes, edges, setNodes, setEdges } = useVueFlow()
  const savedPositions = useInitialPositions()
  const { getVisibility } = useVisibilityState()

  watchDeep(nodes, (newNodes) => {
    const positions: Record<string, { x: number, y: number }> = {}
    newNodes.forEach((node) => {
      positions[node.id] = node.position
    })
    savedPositions.value = positions
  })

  const toggleCategoryVisibility = (categoryId: string, visible: boolean) => {
    const categoryEdges = edges.value.filter(e => e.source === categoryId)
    const connectedGroupIds = categoryEdges.map(e => e.target)

    setNodes(
      nodes.value.map((node) => {
        if (connectedGroupIds.includes(node.id)
          || connectedGroupIds.some(groupId => node.parentNode === groupId)) {
          return { ...node, hidden: !visible }
        }
        return node
      }),
    )

    setEdges(
      edges.value.map((edge) => {
        if (edge.source === categoryId || connectedGroupIds.includes(edge.source)) {
          return { ...edge, hidden: !visible }
        }
        return edge
      }),
    )
  }

  const processSkillsData = () => {
    const newNodes = []
    const newEdges = []

    const centerX = 800
    const centerY = 600
    const categoryRadius = 450
    const baseGroupRadius = 200

    const createNodeWithSavedPosition = (node: any) => {
      const savedPosition = savedPositions.value[node.id]
      return {
        ...node,
        position: savedPosition || node.position,
      }
    }

    // Root node
    newNodes.push(createNodeWithSavedPosition({
      id: 'root',
      type: skillsData.type,
      position: { x: centerX - 50, y: centerY - 50 },
      data: {
        label: skillsData.name,
        childCount: skillsData.children.length,
      },
    }))

    // Categories and groups
    skillsData.children.forEach((category, i) => {
      const categoryAngle = (2 * Math.PI * i) / skillsData.children.length
      const categoryPos = getRadialPosition(centerX, centerY, categoryRadius, categoryAngle)
      const categoryId = `cat-${i}`
      const isVisible = getVisibility(categoryId)

      newNodes.push(createNodeWithSavedPosition({
        id: categoryId,
        type: 'category',
        position: categoryPos,
        data: {
          label: category.name,
          angle: categoryAngle,
        },
      }))

      newEdges.push({
        id: `e-root-${i}`,
        source: 'root',
        target: categoryId,
        animated: true,
        sourceHandle: `handle-${i}`,
      })

      // Groups
      category.groups.forEach((group, j) => {
        const groupSkills = category.skills.filter(skill => skill.inGroup.includes(group))
        const skillsPerRow = 2
        const rowHeight = 85
        const rowSpacing = 20
        const colWidth = 190
        const groupHeight = Math.ceil(groupSkills.length / skillsPerRow) * (rowHeight + rowSpacing) + 120

        const xOffset = Math.cos(categoryAngle) * baseGroupRadius
        const yStart = -((category.groups.length * groupHeight) / 2)
        const yOffset = yStart + (j * (groupHeight + 50))

        const groupPos = {
          x: categoryPos.x + xOffset,
          y: categoryPos.y + yOffset,
        }

        const groupId = `group-${i}-${j}`

        newNodes.push(createNodeWithSavedPosition({
          id: groupId,
          type: 'group',
          position: groupPos,
          data: {
            label: group,
            angle: categoryAngle,
            height: groupHeight,
          },
          hidden: !isVisible,
        }))

        newEdges.push({
          id: `e-${categoryId}-${j}`,
          source: categoryId,
          target: groupId,
          hidden: !isVisible,
        })

        groupSkills.forEach((skill, k) => {
          const row = Math.floor(k / skillsPerRow)
          const col = k % skillsPerRow
          newNodes.push({
            id: `skill-${i}-${j}-${k}`,
            type: 'skill',
            position: {
              x: col * colWidth + 10,
              y: row * (rowHeight + rowSpacing) + 70,
            },
            data: { ...skill },
            parentNode: groupId,
            expandParent: true,
            draggable: false,
            hidden: !isVisible,
          })
        })
      })
    })

    setNodes(newNodes)
    setEdges(newEdges)
  }

  return { nodes, edges, processSkillsData, toggleCategoryVisibility }
}
