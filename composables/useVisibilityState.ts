import { useLocalStorage } from '@vueuse/core'
import initialVisibility from '~/assets/visible.json'

export const useVisibilityState = () => {
  const visibilityState = useLocalStorage('skill-visibility-state', {} as Record<string, boolean>)

  if (Object.keys(visibilityState.value).length === 0) {
    visibilityState.value = initialVisibility
  }

  const getVisibility = (categoryId: string) => {
    return visibilityState.value[categoryId] ?? true
  }

  const setVisibility = (categoryId: string, visible: boolean) => {
    visibilityState.value = {
      ...visibilityState.value,
      [categoryId]: visible,
    }
  }

  return {
    getVisibility,
    setVisibility,
  }
}
