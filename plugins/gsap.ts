import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

/**
 * Nuxt plugin for GSAP animation library
 * Registers ScrollTrigger and ScrollToPlugin
 */
export default defineNuxtPlugin(() => {
  // Register GSAP plugins
  gsap.registerPlugin(
    ScrollToPlugin,
    ScrollTrigger,
  )

  // Provide GSAP and its plugins to the Nuxt app
  return {
    provide: {
      gsap,
      ScrollTrigger,
      ScrollToPlugin,
      ticker: gsap.ticker,
    },
  }
})
