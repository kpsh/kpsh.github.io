export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('nav', {
    mounted(el, binding) {
      el.style.cursor = 'pointer'
      el.addEventListener('click', () => {
        const router = useRouter()
        router.push(binding.value)
      })
    },
  })
})
