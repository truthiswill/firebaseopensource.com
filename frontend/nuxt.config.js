import firebaseConfig from '../shared/firebaseConfig'
import getRoutes from './assets/js/getRoutes'

export default async () => {
  const routes = await getRoutes()
  return {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
      title: process.env.npm_package_name || '',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: process.env.npm_package_description || ''
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: ['@/assets/styles/base.scss'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/firebaseInit'],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: ['@nuxtjs/eslint-module', '@nuxt/typescript-build'],
    /*
     ** Nuxt.js modules
     */
    modules: [
      '@nuxtjs/pwa',
      [
        '@nuxtjs/sitemap',
        {
          path: '/sitemap.xml',
          hostname: 'https://firebaseopensource.com',
          cacheTime: 1000 * 60 * 60 * 24,
          routes
        }
      ],
      [
        '@nuxtjs/firebase',
        {
          config: firebaseConfig,
          services: {
            firestore: true
          }
        }
      ]
    ],
    /*
     ** Build configuration
     */
    build: {
      /*
       ** You can extend webpack config here
       */
      extend () {}
    }
  }
}
