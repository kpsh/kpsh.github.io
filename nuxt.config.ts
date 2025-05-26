// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxtjs/sitemap',
    '@nuxtjs/seo',
    'nuxt-appwrite',
  ],
  ssr: false,
  devtools: { enabled: true },

  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
    head: {
      title: 'Klohair Pashaj',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Software Engineer, specializing in bringing innovative ideas to life. Open to new opportunities. Tech stack: Vue.js, Nuxt, Tailwind CSS, and more.',
        },
        { name: 'apple-mobile-web-app-title', content: 'Klohair Pashaj' },
      ],

      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-48x48.png',
          sizes: '48x48',
        },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  build: {
    transpile: ['gsap'],
  },

  compatibilityDate: '2024-10-22',

  appwrite: {
    endpoint: 'https://cloud.appwrite.io/v1',
    project: '67632eb1002b01ee9c36',
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  i18n: {
    lazy: true,
    langDir: 'locales/',
    strategy: 'no_prefix',
    locales: [
      { code: 'al', name: 'Shqip', file: 'al.json' },
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'fr', name: 'Français', file: 'fr.json' },
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
    },
  },
  ogImage: { enabled: false },
})
