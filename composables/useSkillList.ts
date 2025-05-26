import type { SkillsData } from '~/types/skills'

export const useSkillList = (skillsData: SkillsData) => {
  const categories = computed(() => {
    return skillsData.children.filter(child => child.type === 'category').map((category) => {
      const groupedSkills = category.groups.map(group => ({
        name: group,
        skills: category.skills.filter(skill => skill.inGroup.includes(group)),
      }))

      return {
        name: category.name,
        groups: groupedSkills,
      }
    })
  })

  return {
    categories,
  }
}
