import { useLocalStorage } from '@vueuse/core'
import initialPositions from '~/assets/positions.json'

export const useInitialPositions = () => {
  const savedPositions = useLocalStorage('skill-node-positions', {} as Record<string, { x: number, y: number }>)

  if (Object.keys(savedPositions.value).length === 0) {
    savedPositions.value = initialPositions
  }

  return savedPositions
}
