import projectsJson from '@/assets/projects.json'

interface Project {
  id: number | string
  title: string
  description: {
    en: string | null
    fr?: string | null
    al?: string | null
  }
  url: string
  tags: string[]
  source: string
  image: string
}

interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  topics: string[] | null
  archived: boolean
}

export const useProjectsStore = defineStore('Projects', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<unknown>(null)

  async function fetchProjects() {
    if (projects.value.length > 0) return
    loading.value = true
    error.value = null
    let githubProjects: Project[] = []
    let githubError: string | null = null
    try {
      const githubRes = await fetch('https://api.github.com/users/kpsh/repos')
      if (!githubRes.ok) {
        throw new Error(`GitHub API error: ${githubRes.status} ${githubRes.statusText}`)
      }
      let githubData: GitHubRepo[] = []
      try {
        githubData = await githubRes.json()
      }
      catch {
        throw new Error('Failed to parse GitHub API response')
      }

      githubProjects = githubData
        .filter((repo: GitHubRepo) => !repo.archived && repo.description)
        .map((repo: GitHubRepo) => ({
          id: repo.id,
          title: repo.name,
          description: {
            en: repo.description,
            fr: null,
            al: null,
          },
          url: repo.html_url,
          tags: repo.topics ?? [],
          source: 'github',
          image: `https://placehold.co/600x400?text=${encodeURIComponent(repo.name)}`,
        }))
    }
    catch (e) {
      githubError = e instanceof Error ? e.message : String(e)
    }
    finally {
      const localData: Project[] = (projectsJson as unknown as Array<Partial<Project>>).map(p => ({
        ...p,
        image: p.image || `https://placehold.co/600x400?text=${encodeURIComponent(p.title ?? String(p.id))}`,
      }) as Project)
      projects.value = [...localData, ...githubProjects]
      if (githubError) error.value = githubError
      loading.value = false
    }
  }

  return {
    projects,
    loading,
    error,
    fetchProjects,
  }
})
