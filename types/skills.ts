export interface Skill {
  name: string
  type: string
  inGroup: string[]
  description: string
  url: string
  icon: string
}

export interface Category {
  name: string
  type: string
  groups: string[]
  options: {
    closeable: boolean
    draggable: boolean
  }
  skills: Skill[]
}

export interface SkillsData {
  name: string
  type: string
  options: {
    closeable: boolean
    draggable: boolean
  }
  children: Category[]
}
