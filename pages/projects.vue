<script lang="ts" setup>
definePageMeta({
  title: 'Projects',
  description: 'Projects page',
  slideover: true,
})

useSeoMeta({
  title: 'Projects',
  description: 'Projects page',
})

const showAlert = ref(true)

const projectsStore = useProjectsStore()
const { projects, loading, error } = storeToRefs(projectsStore)
onMounted(() => {
  projectsStore.fetchProjects()
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex-1">
      <UAlert
        v-if="showAlert"
        icon="i-heroicons-information-circle"
        color="blue"
        variant="subtle"
        title="Note"
        description="Some parts of projects are available only in English due to the GitHub API limitation."
        :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'blue', variant: 'link', padded: false }"
        @close="showAlert = false"
      />
    </div>

    <!-- project filters, eg: technology, styling, source, status -->
    <div class="flex flex-row items-center">
      <!-- Add filter buttons here using nuxt ui -->
    </div>

    <!-- project cards -->
    <div class="flex flex-col gap-4">
      <CardProject
        v-for="project in projects"
        :key="project.id"
        :title="project.title"
        :description="project.description ?? ''"
        :image="project.image"
        :tags="project.tags"
        :url="project.url"
      />
      <div
        v-if="loading"
        class="text-center text-gray-500 flex flex-col gap-4"
      >
        <USkeleton
          v-for="n in 4"
          :key="n"
          class="h-64 w-full"
        />
      </div>
      <div
        v-if="error"
        class="text-center text-red-500"
      >
        {{ error }}
        Error loading projects
      </div>
    </div>
  </div>
</template>
